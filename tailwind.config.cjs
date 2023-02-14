/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#E5E5E5',
                primary: '#1014179E',
                secondary: 'rgba(16, 20, 23, 0.14)',
                error: '#DB1414',
                accent: '#EF5630',
                'accent-light': '#E99D8A',
            }
        },
        screens: {
            'sm':{max:'375px'},
            'md': {max: '679px'},
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
