import { prisma } from "../src/lib/prisma";
import { hashPassword } from "../src/lib/auth";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "hello@kantimohanthy.dev";
  const rawPassword = process.env.SEED_ADMIN_PASSWORD || "AdminSecret123!";
  const passwordHash = await hashPassword(rawPassword);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      name: "Ujwal Shyam Kantimohanthy",
      headline: "Internet Engineer — Networking, AI, Space Systems",
    },
  });

  console.log(`Seeded admin user: ${adminEmail}`);
}

main()
  .catch((err) => {
    console.error("Seed script error:", err);
  })
  .finally(() => prisma.$disconnect());
