import colors from "@/styles/colors";
import type { Config } from "tailwindcss";

const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const range = (start: number, end: number): number[] => {
 return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
const sizes = {
 ...range(1, 2000).reduce<Record<string, string>>((acc, px) => {
  acc[`${px}pxr`] = pxToRem(px);
  return acc;
 }, {}),
};

export default {
 content: [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 // safelist: Object.entries(colors).flatMap(([key, color]) => [
 //  `bg-[${color}]`,
 //  `text-[${color}]`,
 //  `border-[${color}]`,
 //  `border-${key}/30`,
 //  `decoration-[${color}]`,
 //  `hover:before:bg-[${color}]`,
 //  `hover:before:bg-${key}/10`,
 //  `hover:before:border-[${color}]`,
 //  `before:border-[${color}]`,
 // ]),
 theme: {
  extend: {
   fontFamily: {
    pretendard: ["var(--font-pretendard)"],
   },
   fontSize: {
    ...sizes,
   },
   borderWidth: sizes,
   lineHeight: sizes,
   borderRadius: sizes,
   spacing: sizes,
   colors: colors,
   boxShadow: {
    dropdownOptions: "2px 2px 12px 2px #0000001A",
    tooltip: "2px 2px 8px 2px #00000033",
    input: "0 0 4px #0075ff",
    paymentCard: "0px 0px 12px 0px #00000033",
   },

   keyframes: {
    dialogScale: {
     "0%": { transform: "scale(0)", opacity: "0" },
     "100%": { transform: "scale(1)", opacity: "1" },
    },
    dialogScaleOut: {
     "0%": { transform: "scale(1)", opacity: "1" },
     "100%": { transform: "scale(0)", opacity: "0" },
    },
    fadeIn: {
     "0%": { opacity: "0" },
     "100%": { opacity: "1" },
    },
    fadeOut: {
     "0%": { opacity: "1" },
     "100%": { opacity: "0" },
    },
    notifyShow: {
     "0%": { transform: "translateY(100%)", opacity: "0" },
     "100%": { transform: "translateY(0)", opacity: "1" },
    },
    notifyHide: {
     "0%": { transform: "translateY(0)", opacity: "1" },
     "100%": { transform: "translateY(100%)", opacity: "0" },
    },
    loadingDot: {
     "0%, 100%": { opacity: "1", backgroundColor: "#1E85FF" },
     "50%": { opacity: "0.5", backgroundColor: "#C6E0FF" },
    },
   },
   animation: {
    dialogScale: "dialogScale 0.3s ease-out",
    dialogScaleOut: "dialogScaleOut 0.3s ease-out",
    fadeIn: "fadeIn 0.3s ease-out",
    fadeOut: "fadeOut 0.3s ease-out",
    notifyShow: "notifyShow 0.3s ease-out",
    notifyHide: "notifyHide 0.3s ease-out",
    "loading-dot-1": "loadingDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "loading-dot-2": "loadingDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s",
    "loading-dot-3": "loadingDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.8s",
   },
  },
 },
 plugins: [],
} satisfies Config;
