import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  
  // Config para ordenar imports automáticamente
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",             // React, Node.js nativos
            "external",            // lucide-react, next, etc.
            "internal",            // Alias como '@/components/...'
            ["parent", "sibling"], // Imports relativos ('../' o './')
            "index",
            "type",                // Tipos de TypeScript
          ],
          pathGroups: [
            {
              pattern: "{react,react-dom,react-dom/**,next,next/**}",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always", // Espacio entre cada grupo
          alphabetize: {
            order: "asc",               // Ordenar A-Z
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
