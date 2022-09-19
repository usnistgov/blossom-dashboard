/**
 * A "fixed" version of useParams that works with mangled HashRouter URLS
 */
export default function useParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.href);
  return [...params.entries()].reduce((acc, [k, v]) => {
    acc[k] = v.replace("#/", "");
    return acc;
  }, {} as Record<string, string>);
}
