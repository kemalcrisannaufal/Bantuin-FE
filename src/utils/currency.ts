const convertToIDR = (value: number | undefined) => {
  if (typeof value === "undefined") return "Rp 0.00";
  return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
};

export { convertToIDR };
