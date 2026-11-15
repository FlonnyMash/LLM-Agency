import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The design kit's scripts (nav, forms, scroll moments) bind to the DOM of a
    // fully loaded page, so internal links are plain <a> (full page loads) and
    // photographs are plain <img> with srcset (static export, no image server).
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The design kit is copied in as plain files and is never edited here.
    "public/sc/**",
    "scrollcraft/**",
    ".taste-skill/**",
    "shots/**",
  ]),
]);

export default eslintConfig;
