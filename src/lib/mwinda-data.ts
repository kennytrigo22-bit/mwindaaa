export type Tx = {
  id: string;
  label: string;
  sub: string;
  amount: number; // FCFA, negative = débit
  kind: "shop" | "sub" | "topup" | "tool";
  date: string;
};

export const user = { first: "Daniel", name: "DANIEL MOUKENGUE", balance: 24500 };

export const card = { last4: "4821", expiry: "09/29", full: "4821 7730 1956 4821", cvv: "318" };

export const transactions: Tx[] = [
  { id: "1", label: "Shein", sub: "Paiement en ligne · USD", amount: -9800, kind: "shop", date: "Aujourd'hui · 10 h 14" },
  { id: "2", label: "Recharge MTN MoMo", sub: "06 612 ** 48", amount: 15000, kind: "topup", date: "Hier · 14 h 32" },
  { id: "3", label: "Netflix", sub: "Abonnement mensuel", amount: -5200, kind: "sub", date: "Hier · 08 h 00" },
  { id: "4", label: "Canva Pro", sub: "Outil en ligne", amount: -3100, kind: "tool", date: "28 oct. · 19 h 45" },
  { id: "5", label: "Recharge Airtel Money", sub: "05 304 ** 11", amount: 10000, kind: "topup", date: "27 oct. · 12 h 03" },
  { id: "6", label: "AliExpress", sub: "Paiement en ligne · USD", amount: -12400, kind: "shop", date: "25 oct. · 21 h 18" },
  { id: "7", label: "Spotify", sub: "Abonnement mensuel", amount: -2950, kind: "sub", date: "24 oct. · 09 h 00" },
];

/** Recharge fee rule from the charter mockup: 1,5 % (15 000 → 225 FCFA). */
export const RECHARGE_FEE_RATE = 0.015;
export const rechargeFee = (amount: number) => Math.round(amount * RECHARGE_FEE_RATE);

export const fcfa = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(Math.abs(n)).replace(/\u202f|\u00a0/g, " ");
