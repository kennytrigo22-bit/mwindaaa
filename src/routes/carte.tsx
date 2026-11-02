import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Snowflake, Copy, Gauge, Globe, Repeat } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/mw/AppShell";
import { VirtualCard } from "@/components/mw/VirtualCard";

export const Route = createFileRoute("/carte")({
  head: () => ({
    meta: [
      { title: "Ma carte Visa virtuelle — Mwinda" },
      { name: "description", content: "Affiche, bloque et gère les plafonds de ta carte Visa virtuelle Mwinda." },
      { property: "og:title", content: "Ma carte — Mwinda" },
      { property: "og:description", content: "Gère ta carte Visa virtuelle en un geste." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CardScreen,
});

function CardScreen() {
  const [show, setShow] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [online, setOnline] = useState(true);
  const [subs, setSubs] = useState(true);

  return (
    <AppShell>
      <ScreenHeader title="Ma carte" subtitle="Gère ta carte mwinda"
        right={<span className={`rounded-full px-3 py-1 text-xs font-semibold ${frozen ? "bg-destructive/20 text-destructive" : "bg-accent text-success"}`}>{frozen ? "Bloquée" : "Carte active"}</span>} />
      <div className="animate-rise"><VirtualCard revealed={show && !frozen} frozen={frozen} /></div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Tile onClick={() => setShow(!show)} icon={show ? EyeOff : Eye} label={show ? "Masquer" : "Afficher"} />
        <Tile onClick={() => navigator.clipboard?.writeText("4821773019564821")} icon={Copy} label="Copier" />
        <Tile onClick={() => setFrozen(!frozen)} icon={Snowflake} label={frozen ? "Débloquer" : "Bloquer"} active={frozen} />
      </div>

      <section className="mt-8 rounded-2xl bg-card p-4">
        <div className="flex items-center gap-3">
          <Gauge className="h-5 w-5 text-sun" />
          <div className="flex-1"><p className="font-semibold">Plafond mensuel</p><p className="text-xs text-muted-foreground">Gère tes limites de paiement</p></div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[31%] rounded-full bg-primary" /></div>
        <p className="mt-2 text-xs text-muted-foreground tabular"><span className="text-foreground">93 450</span> / 300 000 FCFA utilisés ce mois</p>
      </section>

      <ul className="mt-4 divide-y rounded-2xl bg-card px-4">
        <Toggle icon={Globe} label="Paiements sur sites étrangers" on={online} set={setOnline} />
        <Toggle icon={Repeat} label="Abonnements (Netflix, Spotify…)" on={subs} set={setSubs} />
      </ul>
      <p className="mt-4 text-center text-xs text-muted-foreground">Frais de change : 3 % sur les paiements en devise, affichés avant chaque achat.</p>
    </AppShell>
  );
}

function Tile({ icon: Icon, label, onClick, active }: { icon: typeof Eye; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 rounded-2xl p-4 text-sm font-semibold transition-transform active:scale-95 ${active ? "bg-destructive/20 text-destructive" : "bg-card"}`}>
      <Icon className="h-5 w-5" />{label}
    </button>
  );
}

function Toggle({ icon: Icon, label, on, set }: { icon: typeof Eye; label: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <li className="flex items-center gap-3 py-4">
      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 text-sm font-medium">{label}</span>
      <button role="switch" aria-checked={on} aria-label={label} onClick={() => set(!on)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-ivory transition-all ${on ? "left-6" : "left-1"}`} />
      </button>
    </li>
  );
}
