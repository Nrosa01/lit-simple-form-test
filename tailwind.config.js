const {tailwindTransform} = require('postcss-lit');

/** @type {import('tailwindcss').Config} */

export default {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx}"],
    transform: {
      ts: tailwindTransform
    }
  }
};