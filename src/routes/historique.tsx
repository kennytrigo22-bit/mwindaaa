import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, ScreenHeader } from "@/components/mw/AppShell";
import { TxRow } from "@/components/mw/TxRow";
import { fcfa, transactions } from "@/lib/mwinda-data";

export const Route = createFileRoute("/historique")({
  head: () => ({
    meta: [
      { title: "Historique des opérations — Mwinda" },
      { name: "description", content: "Toutes tes recharges et paiements Mwinda, clairs et détaillés." },
      { property: "og:title", content: "Historique — Mwinda" },
      { property: "og:description", content: "Chaque franc, lisible." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: History,
});

const filters = [
  { id: "all", label: "Tout" },
  { id: "in", label: "Recharges" },
  { id: "out", label: "Paiements" },
] as const;

function History() {
  const [f, setF] = useState<(typeof filters)[number]["id"]>("all");
  const list = transactions.filter((t) => f === "all" || (f === "in" ? t.amount > 0 : t.amount < 0));
  const spent = transactions.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);
  const inn = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);

  return (
    <AppShell>
      <ScreenHeader title="Historique" subtitle="Octobre – novembre 2026" />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card p-4"><p className="text-xs text-muted-foreground">Rechargé</p><p className="mt-1 font-display text-xl font-bold text-success tabular">+{fcfa(inn)}</p></div>
        <div className="rounded-2xl bg-card p-4"><p className="text-xs text-muted-foreground">Dépensé</p><p className="mt-1 font-display text-xl font-bold tabular">−{fcfa(spent)}</p></div>
      </div>
      <div role="tablist" className="mt-6 flex gap-2">
        {filters.map((x) => (
          <button key={x.id} role="tab" aria-selected={f === x.id} onClick={() => setF(x.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${f === x.id ? "bg-foreground text-background" : "bg-card text-muted-foreground"}`}>{x.label}</button>
        ))}
      </div>
      <ul className="mt-2 divide-y">{list.map((t) => <TxRow key={t.id} tx={t} />)}</ul>
    </AppShell>
  );
}
