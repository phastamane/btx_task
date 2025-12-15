export function truncateText(
  text: string | undefined,
  maxLength: number
): string {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}
