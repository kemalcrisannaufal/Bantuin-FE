export interface ICategory {
  key: string;
  label: string;
}

const INCOME_CATEGORIES: ICategory[] = [
  {
    key: "Gaji",
    label: "Gaji",
  },
  {
    key: "Bonus",
    label: "Bonus",
  },
  {
    key: "Freelance",
    label: "Freelance",
  },
  {
    key: "Investasi",
    label: "Investasi",
  },
  {
    key: "Usaha",
    label: "Usaha",
  },
  {
    key: "Hadiah",
    label: "Hadiah",
  },
  {
    key: "Lainnya",
    label: "Lainnya",
  },
] as const;

const EXPENSE_CATEGORIES: ICategory[] = [
  {
    key: "Makanan & Minuman",
    label: "Makanan & Minuman",
  },
  {
    key: "Transportasi",
    label: "Transportasi",
  },
  {
    key: "Perumahan (Listrik/Air/Internet)",
    label: "Perumahan (Listrik/Air/Internet)",
  },
  {
    key: "Belanja",
    label: "Belanja",
  },
  {
    key: "Hiburan",
    label: "Hiburan",
  },
  {
    key: "Kesehatan",
    label: "Kesehatan",
  },
  {
    key: "Pendidikan",
    label: "Pendidikan",
  },
  {
    key: "Travel",
    label: "Travel",
  },
  {
    key: "Subscription (Spotify/Netflix)",
    label: "Subscription (Spotify/Netflix)",
  },
  {
    key: "Donasi",
    label: "Donasi",
  },
  {
    key: "Lainnya",
    label: "Lainnya",
  },
] as const;

export { INCOME_CATEGORIES, EXPENSE_CATEGORIES };
