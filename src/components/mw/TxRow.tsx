import { ShoppingBag, Tv, ArrowDownLeft, Wrench } from "lucide-react";
import { fcfa, type Tx } from "@/lib/mwinda-data";

const icons = { shop: ShoppingBag, sub: Tv, topup: ArrowDownLeft, tool: Wrench };

export function TxRow({ tx }: { tx: Tx }) {
  const Icon = icons[tx.kind];
  const credit = tx.amount > 0;
  return (
    <li className="flex items-center gap-3 py-3">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${credit ? "bg-accent text-success" : "bg-secondary text-foreground"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{tx.label}</p>
        <p className="truncate text-xs text-muted-foreground">{tx.sub} · {tx.date}</p>
      </div>
      <p className={`shrink-0 font-display text-sm font-bold tabular ${credit ? "text-success" : ""}`}>
        {credit ? "+" : "−"} {fcfa(tx.amount)} <span className="text-[10px] font-medium text-muted-foreground">FCFA</span>
      </p>
    </li>
  );
}
