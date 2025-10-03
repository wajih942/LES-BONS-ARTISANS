import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,     // Node.js globals like 'process', 'module', '__dirname'
        ...globals.es2021,   // Modern JS globals
        ...globals.browser   // Keep browser globals if needed
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module"
      }
    },
    env: {
      node: true,           // Enables Node.js environment
      es2021: true,
      browser: true         // Optional, only if you also have browser code
    }
  }
]);
