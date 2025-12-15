export function formatDateRu(dateInput: string | number | Date | undefined) {
  if (!dateInput) return;
  const date = new Date(dateInput);
  return date.toLocaleDateString("ru-RU");
}

export function pluralAge(age: number | undefined) {
  if (!age && age !== 0) return;
  const lastDigit = age % 10;
  const lastTwo = age % 100;

  if (lastTwo >= 11 && lastTwo <= 19) return `${age} лет`;
  if (lastDigit === 1) return `${age} год`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${age} года`;

  return `${age} лет`;
}
