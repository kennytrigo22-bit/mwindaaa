import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, Info } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/mw/AppShell";
import { fcfa, rechargeFee } from "@/lib/mwinda-data";

export const Route = createFileRoute("/recharger")({
  head: () => ({
    meta: [
      { title: "Recharger ma carte — Mwinda" },
      { name: "description", content: "Recharge ta carte Mwinda avec MTN MoMo ou Airtel Money, frais affichés avant de confirmer." },
      { property: "og:title", content: "Recharger ma carte — Mwinda" },
      { property: "og:description", content: "Recharge par mobile money, sans déplacement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Recharge,
});

const ops = [
  { id: "mtn", name: "MTN MoMo", num: "06 612 ** 48", dot: "bg-sun" },
  { id: "airtel", name: "Airtel Money", num: "05 304 ** 11", dot: "bg-destructive" },
];
const presets = [5000, 10000, 25000, 50000];

function Recharge() {
  const [op, setOp] = useState("mtn");
  const [amount, setAmount] = useState(15000);
  const [done, setDone] = useState(false);
  const fee = rechargeFee(amount);
  const valid = amount >= 500 && amount <= 500000;

  if (done) {
    return (
      <AppShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center animate-rise">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-sun"><Check className="h-10 w-10" strokeWidth={3} /></span>
          <h1 className="mt-6 text-2xl font-bold">Recharge envoyée</h1>
          <p className="mt-2 max-w-xs text-muted-foreground">Valide le paiement de {fcfa(amount + fee)} FCFA sur ton téléphone. Ta carte sera créditée de <b className="text-foreground">{fcfa(amount)} FCFA</b>.</p>
          <Link to="/" className="mt-8 rounded-full bg-card px-6 py-3 font-semibold">Retour à l'accueil</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link to="/" aria-label="Retour" className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-card"><ChevronLeft className="h-5 w-5" /></Link>
      <ScreenHeader title="Recharger" subtitle="Choisis ton mode de recharge" />

      <div role="radiogroup" className="grid gap-3">
        {ops.map((o) => (
          <button key={o.id} role="radio" aria-checked={op === o.id} onClick={() => setOp(o.id)}
            className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left transition-colors ${op === o.id ? "border-primary" : "border-transparent"}`}>
            <span className={`h-3 w-3 shrink-0 rounded-full ${o.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{o.name}</p>
              <p className="text-xs text-muted-foreground tabular">{o.num}</p>
            </div>
            <span className={`grid h-6 w-6 place-items-center rounded-full border-2 ${op === o.id ? "border-primary bg-primary text-primary-foreground" : ""}`}>
              {op === o.id && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
          </button>
        ))}
      </div>

      <section className="mt-8">
        <label htmlFor="amount" className="text-sm text-muted-foreground">Montant à recharger</label>
        <div className="mt-1 flex items-baseline gap-2 border-b-2 border-primary pb-2">
          <input id="amount" inputMode="numeric" value={amount ? fcfa(amount) : ""}
            onChange={(e) => setAmount(Number(e.target.value.replace(/\D/g, "")) || 0)}
            className="w-full min-w-0 bg-transparent font-display text-[40px] font-bold tabular outline-none" />
          <span className="font-display text-lg font-semibold text-sun">FCFA</span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {presets.map((p) => (
            <button key={p} onClick={() => setAmount(p)} className={`rounded-full py-2 text-sm font-semibold tabular ${amount === p ? "bg-foreground text-background" : "bg-card"}`}>
              {p / 1000} k
            </button>
          ))}
        </div>
      </section>

      <dl className="mt-8 space-y-3 rounded-2xl bg-card p-4 text-sm">
        <div className="flex justify-between"><dt className="text-muted-foreground">Montant</dt><dd className="tabular">{fcfa(amount)} FCFA</dd></div>
        <div className="flex justify-between"><dt className="flex items-center gap-1 text-muted-foreground">Frais <Info className="h-3.5 w-3.5" /></dt><dd className="tabular">{fcfa(fee)} FCFA</dd></div>
        <div className="flex justify-between border-t pt-3"><dt className="font-semibold">Tu reçois</dt><dd className="font-display font-bold text-sun tabular">{fcfa(amount)} FCFA</dd></div>
      </dl>
      {!valid && <p className="mt-3 text-sm text-destructive">Choisis un montant entre 500 et 500 000 FCFA.</p>}

      <button disabled={!valid} onClick={() => setDone(true)}
        className="mt-6 w-full rounded-full bg-primary py-4 font-display text-base font-bold text-primary-foreground shadow-sun transition-transform active:scale-[0.98] disabled:opacity-40">
        Confirmer · {fcfa(amount + fee)} FCFA
      </button>
    </AppShell>
  );
}
