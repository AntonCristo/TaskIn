export const sliceTextAndAddEllipsis = (
  text: string,
  maxCharsAllowed: number
) => {
  if (text.length > maxCharsAllowed) {
    return [true, `${text.slice(0, maxCharsAllowed)}...`];
  }

  return [false, text];
};
