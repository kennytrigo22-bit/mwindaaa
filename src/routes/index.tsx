import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Eye, EyeOff, Plus, CreditCard, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/mw/AppShell";
import { VirtualCard } from "@/components/mw/VirtualCard";
import { TxRow } from "@/components/mw/TxRow";
import { fcfa, transactions, user } from "@/lib/mwinda-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mwinda — Ta carte Visa virtuelle gratuite" },
      { name: "description", content: "Crée ta carte Visa virtuelle gratuite et recharge-la avec MTN MoMo ou Airtel Money. Paie partout, en toute clarté." },
      { property: "og:title", content: "Mwinda — Paie partout. En toute clarté." },
      { property: "og:description", content: "Carte Visa virtuelle gratuite, rechargeable par mobile money au Congo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [hide, setHide] = useState(false);
  return (
    <AppShell>
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 animate-rise">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sun font-display font-bold text-primary-foreground">DM</span>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Bonjour {user.first} 👋</p>
            <p className="truncate font-display font-semibold">Ravi de te revoir !</p>
          </div>
        </div>
        <button aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-full bg-card">
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-sun" />
        </button>
      </header>

      <section className="animate-rise [animation-delay:60ms]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Solde disponible
          <button onClick={() => setHide(!hide)} aria-label={hide ? "Afficher le solde" : "Masquer le solde"} className="p-1">
            {hide ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-1 font-display text-[44px] font-bold leading-none tracking-tight tabular">
          {hide ? "•• •••" : fcfa(user.balance)} <span className="text-lg font-semibold text-sun">FCFA</span>
        </p>
      </section>

      <div className="mt-6 animate-rise [animation-delay:120ms]">
        <Link to="/carte"><VirtualCard /></Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 animate-rise [animation-delay:180ms]">
        <Action to="/recharger" icon={Plus} label="Recharger" primary />
        <Action to="/carte" icon={CreditCard} label="Ma carte" />
        <Action to="/historique" icon={Clock} label="Historique" />
      </div>

      <Link to="/profil" className="mt-6 flex items-center gap-3 rounded-2xl border bg-card p-4 animate-rise [animation-delay:220ms]">
        <ShieldCheck className="h-6 w-6 shrink-0 text-success" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Ton argent est gardé par une banque agréée</p>
          <p className="text-xs text-muted-foreground">Régulée par la COBAC · Voir nos garanties</p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>

      <section className="mt-8 animate-rise [animation-delay:260ms]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Dernières opérations</h2>
          <Link to="/historique" className="text-sm font-semibold text-sun">Tout voir</Link>
        </div>
        <ul className="mt-2 divide-y">
          {transactions.slice(0, 3).map((t) => <TxRow key={t.id} tx={t} />)}
        </ul>
      </section>
    </AppShell>
  );
}

function Action({ to, icon: Icon, label, primary }: { to: "/recharger" | "/carte" | "/historique"; icon: typeof Plus; label: string; primary?: boolean }) {
  return (
    <Link to={to} className={`flex flex-col items-center gap-2 rounded-2xl p-4 text-sm font-semibold transition-transform active:scale-95 ${primary ? "bg-primary text-primary-foreground shadow-sun" : "bg-card"}`}>
      <Icon className="h-5 w-5" strokeWidth={2.4} />
      {label}
    </Link>
  );
}
