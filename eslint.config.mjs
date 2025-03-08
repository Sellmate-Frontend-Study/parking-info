import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": "error", // Prettier 포맷팅 오류를 ESLint에서 에러로 표시
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off", // Next.js에서는 React 자동 import
    },
  },
];

export default eslintConfig;