import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "src/index.js",
  output: [
    { file: pkg.module, format: "es" },
    { file: pkg.main, format: "umd", name },
    {
      file: "docs/hyperfov-link-previews.min.js",
      format: "umd",
      name,
      plugins: [terser()],
    },
  ],
  plugins: [
    svelte({ customElement: true, include: /\.wc\.svelte$/ }),
    svelte({ customElement: false, exclude: /\.wc\.svelte$/ }),
    css({ output: "bundle.css" }),
    commonjs(),
    resolve({ browser: true }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
