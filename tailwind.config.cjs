/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1014179E',
                secondary: 'rgba(16, 20, 23, 0.14)',
                error: '#DB1414',
                accent: '#167DEB',
                'accent-light': '#0085FF',
            }
        },
        screens: {
            'md': {max: '679px'},
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
