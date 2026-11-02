import { Link } from "@tanstack/react-router";
import { Home, CreditCard, Plus, Clock, User } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/carte", label: "Carte", icon: CreditCard },
  { to: "/recharger", label: "Recharger", icon: Plus, main: true },
  { to: "/historique", label: "Historique", icon: Clock },
  { to: "/profil", label: "Profil", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background sm:grid sm:place-items-center sm:py-8">
      <div className="relative mx-auto flex h-dvh w-full max-w-[420px] flex-col overflow-hidden bg-background sm:h-[860px] sm:rounded-[44px] sm:border sm:shadow-card">
        <main className="flex-1 overflow-y-auto px-5 pb-32 pt-6">{children}</main>
        <nav
          aria-label="Navigation principale"
          className="absolute inset-x-0 bottom-0 border-t bg-card/95 px-3 pb-6 pt-2 backdrop-blur"
        >
          <ul className="grid grid-cols-5 items-end">
            {tabs.map(({ to, label, icon: Icon, ...t }) => (
              <li key={to} className="flex justify-center">
                <Link
                  to={to}
                  activeOptions={{ exact: true }}
                  className="group flex min-h-12 flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors data-[status=active]:text-foreground"
                >
                  {"main" in t ? (
                    <span className="-mt-7 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-sun transition-transform group-active:scale-95">
                      <Icon className="h-6 w-6" strokeWidth={2.5} />
                    </span>
                  ) : (
                    <Icon className="h-[22px] w-[22px]" />
                  )}
                  <span>{label}</span>
                  {!("main" in t) && (
                    <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-data-[status=active]:opacity-100" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 animate-rise">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
