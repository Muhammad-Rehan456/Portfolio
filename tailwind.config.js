/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.js"
    ],
    theme: {
        extend: {
            colors: {
                dark: '#050505',
                card: '#101010',
                primary: '#00ff9d',
                secondary: '#64748b',
                accent: '#7000ff'
            },
            fontFamily: {
                sans: ['"Outfit"', 'sans-serif'],
                heading: ['"Space Grotesk"', 'sans-serif']
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
            }
        },
    },
    plugins: [],
}
