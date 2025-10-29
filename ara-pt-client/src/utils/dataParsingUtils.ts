export function snakeToCamel(input: string): string {
  return input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}