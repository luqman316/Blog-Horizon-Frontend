import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        'lg': "768px",
        'xl': "768px",
        '2xl': "768px",
      },
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
export default config;
