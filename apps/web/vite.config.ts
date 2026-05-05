import { defineConfig } from "vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"

export default defineConfig( {
	server: {
		host: true,
		port: 5100,
	},
	plugins: [
		react(),
		babel( { presets: [ reactCompilerPreset() ] } ),
	],
} )
