import type { Config } from "tailwindcss";

const colors = ['pink', 'purple', 'blue', 'green']
const colorVariants = ['50', '100', '200', '300', '400', '500', '600', '700']

// 生成 safelist
const safelist = colors.flatMap(color =>
  colorVariants.flatMap(variant => [
    `bg-${color}-${variant}`,
    `text-${color}-${variant}`,
    `hover:bg-${color}-${variant}`,
    `hover:text-${color}-${variant}`,
    `hover:from-${color}-${variant}`,
    `hover:to-${color}-${variant}`,
    `from-${color}-${variant}`,
    `to-${color}-${variant}`,
    `border-${color}-${variant}`,
    `focus:border-${color}-${variant}`,
    `focus:ring-${color}-${variant}`,
    `hover:bg-${color}-50`,
    `bg-${color}-50`,
  ])
)

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist,
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
