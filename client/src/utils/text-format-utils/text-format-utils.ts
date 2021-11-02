export const sliceTextAndAddEllipsis = (
  text: string,
  maxCharsAllowed: number
) => {
  if (text.length > maxCharsAllowed) {
    return `${text.slice(0, maxCharsAllowed)}...`;
  }

  return text;
};
