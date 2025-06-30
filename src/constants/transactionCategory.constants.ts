export interface ICategory {
  key: string;
  label: string;
}

const INCOME_CATEGORIES: ICategory[] = [
  {
    key: "gaji",
    label: "Gaji",
  },
  {
    key: "bonus",
    label: "Bonus",
  },
  {
    key: "freelance",
    label: "Freelance",
  },
  {
    key: "investasi",
    label: "Investasi",
  },
  {
    key: "usaha",
    label: "Usaha",
  },
  {
    key: "hadiah",
    label: "Hadiah",
  },
  {
    key: "lainnya",
    label: "Lainnya",
  },
] as const;

const EXPENSE_CATEGORIES: ICategory[] = [
  {
    key: "makanan/minuman",
    label: "Makanan & Minuman",
  },
  {
    key: "transportasi",
    label: "Transportasi",
  },
  {
    key: "tagihan (listrik/air/internet)",
    label: "Tagihan (Listrik/Air/Internet)",
  },
  {
    key: "belanja",
    label: "Belanja",
  },
  {
    key: "hiburan",
    label: "Hiburan",
  },
  {
    key: "kesehatan",
    label: "Kesehatan",
  },
  {
    key: "pendidikan",
    label: "Pendidikan",
  },
  {
    key: "travel",
    label: "Travel",
  },
  {
    key: "langganan (Spotify/Netflix)",
    label: "Subscription (Spotify/Netflix)",
  },
  {
    key: "donasi",
    label: "Donasi",
  },
  {
    key: "lainnya",
    label: "Lainnya",
  },
] as const;

export { INCOME_CATEGORIES, EXPENSE_CATEGORIES };
