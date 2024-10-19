export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         montserrat:["Montserrat", "sans-serif"],
         poppins:["Poppins", "sans-serif"]
      }, 
      animation: {
        'show-box':"showBox 300ms ease-in-out 1",
        'hide-box':"hideBox 300ms ease-in-out 1",
        'moving':"moving 500ms ease-in-out infinite"
      },
      keyframes: {
        showBox: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        hideBox:{
          '0%':{transform:'scale(1)'},
          '100%':{transform:'scale(0)'}
        },
        moving:{
          '0%':{transform:"translate(-100%)"},
          '100%':{transform:"translate(100%)"}
        },
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ]
}

