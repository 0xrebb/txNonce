import {defineConfig} from 'vite'
import {resolve} from 'path'
export default defineConfig({
    build: {
        outDir: resolve(__dirname,'extension'),
        emptyOutDir: true,
        terserOptions: {
          mangle: false,
        },
        rollupOptions: {
          input: {
            contentJs: resolve(__dirname,'src/content/index.ts'),
          },
          output: {
            entryFileNames:(chunk) => {
                return `js/${chunk.name}.js`
            }
          },
        },
    },
})
