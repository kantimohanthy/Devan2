import { prisma } from "@/lib/prisma";
import { identity as fallbackIdentity } from "@/data/content";

export interface IdentityViewModel {
  name: string;
  handle: string;
  role: string;
  location: string;
  mission: string;
  currentFocus: string[];
  principles: Array<{
    title: string;
    description: string;
    related?: { kind: string; ref: string };
  }>;
}

export class IdentityService {
  async getProfile(): Promise<IdentityViewModel> {
    try {
      const user = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        include: {
          skills: true,
          experiences: true,
          education: true,
        },
      });

      if (user) {
        return {
          name: user.name || fallbackIdentity.name,
          handle: fallbackIdentity.handle,
          role: user.headline || fallbackIdentity.role,
          location: user.location || fallbackIdentity.location,
          mission: user.bio || fallbackIdentity.mission,
          currentFocus: fallbackIdentity.currentFocus,
          principles: fallbackIdentity.principles,
        };
      }
    } catch (err) {
      console.warn("IdentityService DB lookup fallback:", err);
    }
    return fallbackIdentity;
  }
}

export const identityService = new IdentityService();
