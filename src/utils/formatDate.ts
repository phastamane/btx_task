export function formatDateRu(dateString: string | undefined) {
  if (!dateString) return 
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
}

export function pluralAge(age: number |  undefined ){
  if (!age) return 
  const lastDigit = age % 10;
  const lastTwo = age % 100;

  if (lastTwo >= 11 && lastTwo <= 19) return `${age} лет`;
  if (lastDigit === 1) return `${age} год`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${age} года`;

  return `${age} лет`;
}
