export function formatGenerationName(generation: string) {
  return generation
    .replace("generation-", "Gen ")
    .split("-")
    .join(" ")
    .toUpperCase();
}
