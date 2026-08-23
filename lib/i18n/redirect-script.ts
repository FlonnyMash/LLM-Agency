import { localeStorageKey } from "./config";

export const gateRedirectScript = `
(function () {
  var KEY = ${JSON.stringify(localeStorageKey)};
  function stored() {
    try {
      var value = localStorage.getItem(KEY);
      if (value === "en" || value === "de") return value;
    } catch (e) {}
    return null;
  }
  function device() {
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    for (var i = 0; i < list.length; i++) {
      if (String(list[i] || "").toLowerCase().indexOf("de") === 0) return "de";
    }
    return "en";
  }
  function strip(path) {
    var normalized = path.replace(/\\/$/, "") || "/";
    return normalized.replace(/^\\/(en|de)(?=\\/|$)/, "") || "/";
  }
  function localize(locale, path) {
    var rest = strip(path);
    return rest === "/" ? "/" + locale + "/" : "/" + locale + rest + "/";
  }
  var locale = stored() || device();
  var next = localize(locale, location.pathname);
  try { localStorage.setItem(KEY, locale); } catch (e) {}
  if (next !== location.pathname) {
    location.replace(next + location.search + location.hash);
  }
})();
`;

export const preferenceRedirectScript = `
(function () {
  var KEY = ${JSON.stringify(localeStorageKey)};
  var match = location.pathname.match(/^\\/(en|de)(?=\\/|$)/);
  if (!match) return;
  var urlLocale = match[1];
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored !== "en" && stored !== "de") return;
  if (stored === urlLocale) return;
  var rest = location.pathname.replace(/^\\/(en|de)(?=\\/|$)/, "") || "/";
  rest = rest.replace(/\\/$/, "") || "/";
  var next = rest === "/" ? "/" + stored + "/" : "/" + stored + rest + "/";
  location.replace(next + location.search + location.hash);
})();
`;
