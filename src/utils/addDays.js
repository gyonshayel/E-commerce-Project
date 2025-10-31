export function addDays(days) {
  const today = new Date();
  const result = new Date(today);
  result.setDate(result.getDate() + days);
  return result.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
