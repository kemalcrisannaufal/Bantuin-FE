const convertToIDR = (value: number) =>
  value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

export { convertToIDR };
