const DEFAULT_MONTH = new Date().getMonth() + 1;
const DEAFULT_YEAR = new Date().getFullYear();

const MONTHS = [
  { key: "1", label: "Januari" },
  { key: "2", label: "Februari" },
  { key: "3", label: "Maret" },
  { key: "4", label: "April" },
  { key: "5", label: "Mei" },
  { key: "6", label: "Juni" },
  { key: "7", label: "Juli" },
  { key: "8", label: "Agustus" },
  { key: "9", label: "September" },
  { key: "10", label: "Oktober" },
  { key: "11", label: "November" },
  { key: "12", label: "Desember" },
];

const YEARS = Array.from({ length: 8 }, (_, i) => {
  return {
    key: String(new Date().getFullYear() - 2 + i),
    label: String(new Date().getFullYear() - 2 + i),
  };
});

export { DEFAULT_MONTH, DEAFULT_YEAR, MONTHS, YEARS };
