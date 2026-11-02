import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Fingerprint, Landmark, Headphones, Crown, ChevronRight, LogOut } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/mw/AppShell";
import { user } from "@/lib/mwinda-data";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil et sécurité — Mwinda" },
      { name: "description", content: "Identité vérifiée, sécurité, packs et service client Mwinda." },
      { property: "og:title", content: "Profil — Mwinda" },
      { property: "og:description", content: "Ta sécurité, nos garanties." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

const packs = [
  { name: "Essentiel", price: "500", perks: "5 recharges offertes / mois" },
  { name: "Plus", price: "2 000", perks: "Recharges illimitées · change 2 %" },
];

function Profile() {
  return (
    <AppShell>
      <ScreenHeader title="Profil" />
      <div className="flex items-center gap-4 rounded-3xl bg-card-gradient p-5 shadow-card">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sun font-display text-lg font-bold text-primary-foreground">DM</span>
        <div className="min-w-0">
          <p className="truncate font-display font-bold">{user.name}</p>
          <p className="flex items-center gap-1 text-sm text-success"><BadgeCheck className="h-4 w-4" /> Identité vérifiée</p>
        </div>
      </div>

      <h2 className="mt-8 flex items-center gap-2 text-lg font-bold"><Crown className="h-5 w-5 text-sun" /> Packs</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {packs.map((p, i) => (
          <div key={p.name} className={`rounded-2xl border-2 p-4 ${i === 1 ? "border-primary bg-card" : "border-transparent bg-card"}`}>
            <p className="text-sm font-semibold">{p.name}</p>
            <p className="mt-1 font-display text-2xl font-bold tabular">{p.price}<span className="text-xs font-medium text-muted-foreground"> FCFA/mois</span></p>
            <p className="mt-2 text-xs text-muted-foreground">{p.perks}</p>
          </div>
        ))}
      </div>

      <ul className="mt-8 divide-y rounded-2xl bg-card px-4">
        <Row icon={Fingerprint} title="Code PIN et empreinte" sub="Activés" />
        <Row icon={Landmark} title="Nos garanties" sub="Ton argent est conservé par notre banque partenaire" />
        <Row icon={Headphones} title="Service client" sub="Réponse en moins d'1 h, de 8 h à 20 h" />
      </ul>
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-destructive"><LogOut className="h-4 w-4" /> Se déconnecter</button>
    </AppShell>
  );
}

function Row({ icon: Icon, title, sub }: { icon: typeof Crown; title: string; sub: string }) {
  return (
    <li className="flex items-center gap-3 py-4">
      <Icon className="h-5 w-5 shrink-0 text-sun" />
      <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{sub}</p></div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </li>
  );
}
