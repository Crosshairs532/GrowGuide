export function cleanURL(url: string) {
  return url.replace(/\s|%20/g, "").replace(/https?:\/{2,}/, "https://");
}
