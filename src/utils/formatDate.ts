export function formatDateRu(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
}

export function pluralAge(age: number): string {
  const lastDigit = age % 10;
  const lastTwo = age % 100;

  if (lastTwo >= 11 && lastTwo <= 19) return `${age} лет`;
  if (lastDigit === 1) return `${age} год`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${age} года`;

  return `${age} лет`;
}
