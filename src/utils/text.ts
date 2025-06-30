const toTitleCase = (text: string | undefined) => {
  if (text === undefined) return "";

  const texts = text.split(" ");
  const titleCaseText = texts.map(
    (text) => text.charAt(0).toUpperCase() + text.slice(1, text.length)
  );

  return titleCaseText.join(" ");
};

export { toTitleCase };
