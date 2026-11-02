import iconAsset from "@/assets/mwinda_icon.png.asset.json";
import { card, user } from "@/lib/mwinda-data";

export function VirtualCard({ revealed = false, frozen = false }: { revealed?: boolean; frozen?: boolean }) {
  return (
    <div
      className={`relative aspect-[1.586] w-full overflow-hidden rounded-3xl bg-card-gradient p-5 text-foreground shadow-card transition-all duration-500 ${frozen ? "grayscale opacity-60" : ""}`}
      aria-label={`Carte Visa virtuelle se terminant par ${card.last4}`}
    >
      <div className="arches absolute inset-0 opacity-80" aria-hidden />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sun/15 blur-3xl" aria-hidden />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <img src={iconAsset.url} alt="" className="h-8 w-8 rounded-[9px]" />
            <span className="font-display text-lg font-bold tracking-tight">
              mw<span className="relative">ı<span className="absolute left-1/2 top-[3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sun" /></span>nda
            </span>
          </div>
          <span className="rounded-full bg-ivory/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest">Virtuelle</span>
        </div>
        <p className="font-display text-xl font-semibold tracking-[0.18em] tabular">
          {revealed ? card.full : `•••• •••• •••• ${card.last4}`}
        </p>
        <div className="flex items-end justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide">{user.name}</p>
            <p className="text-xs text-muted-foreground tabular">
              Exp. {card.expiry}
              {revealed && <> · CVV {card.cvv}</>}
            </p>
          </div>
          <span className="font-display text-2xl font-extrabold italic tracking-tight">VISA</span>
        </div>
      </div>
    </div>
  );
}
