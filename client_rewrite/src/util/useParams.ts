/**
 * A "fixed" version of useParams that works with mangled HashRouter URLS
 */
export default function useParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.href);
  return [...params.entries()].reduce((acc, [k, v]) => {
    // URLSearchParams gets pretty confused by the first query param
    const kSplit = k.indexOf("?");
    if (kSplit > 0) {
      k = k.slice(kSplit + 1);
    }
    // ReactRouterDom doesn't handle url search params in corner cases very well
    acc[k] = v.replace("#/", "");
    return acc;
  }, {} as Record<string, string>);
}
