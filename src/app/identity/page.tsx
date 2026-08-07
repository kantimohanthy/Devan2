import { identityService } from "@/services/identity.service";

export default async function IdentityPage() {
  const profile = await identityService.getProfile();

  return (
    <div>
      <div className="mb-9">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Identity</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">{profile.name}</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          {profile.role} · {profile.location}
        </p>
      </div>

      <section className="py-5 border-t border-border">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Mission</div>
        <p className="text-[14px] leading-[1.7] max-w-[600px]">{profile.mission}</p>
      </section>

      <section className="py-5 border-t border-border">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Current Focus</div>
        <ul className="list-disc list-inside space-y-1 text-[14px] leading-[1.7] max-w-[600px] text-text-2">
          {profile.currentFocus.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="py-5 border-t border-border">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Operating Principles</div>
        <div className="space-y-4 max-w-[600px]">
          {profile.principles.map((p, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface p-3.5">
              <h3 className="font-semibold text-xs text-text mb-1">{p.title}</h3>
              <p className="text-xs text-text-2 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
