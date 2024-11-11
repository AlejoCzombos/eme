/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {

			},
			colors: {
				'primary': {
				'50': '#effefc',
				'100': '#c7fff7',
				'200': '#90fff0',
				'300': '#51f7e7',
				'400': '#1de4d7',
				'500': '#04c8be',
				'600': '#00b2ad', // principal
				'700': '#05807d',
				'800': '#0a6565',
				'900': '#0d5453',
				'950': '#003133',
				},
				'secondary': {
					'50': '#ecfcff',
					'100': '#d4f6ff',
					'200': '#b2f2ff',
					'300': '#7decff',
					'400': '#40ddff',
					'500': '#14c2ff',
					'600': '#00a3ff',
					'700': '#008bff',
					'800': '#0075d7', // principal
					'900': '#085ea0',
					'950': '#0a3961',
				},
			}
		},
	},
	plugins: [
		require('tailwindcss-animated'),
		require('tailwindcss-intersect')
	],
}
