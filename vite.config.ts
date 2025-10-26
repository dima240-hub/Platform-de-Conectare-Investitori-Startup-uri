import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { reactRouter } from "@react-router/dev/vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(), 
  ],
})
