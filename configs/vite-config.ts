import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { generateBuildCodeNamePlugin, checkSubmoduleUpdatesPlugin } from 'bitapps-dev-utils'
import tsconfigPaths from 'vite-tsconfig-paths'
import { humanId } from 'human-id'
// import csso from 'postcss-csso'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
// import incstr from 'incstr'

export default defineConfig(({ mode }) => {
  const { SERVER_VARIABLES, PLUGIN_SLUG, DEV_SSL, DEV_SSL_CERT_PATH, DEV_SSL_KEY_PATH } = loadEnv(
    mode,
    process.cwd(),
    ''
  )

  const isDevelopment = mode === 'development' || mode === 'test'
  const isTest = mode === 'test'
  const folderName = path.basename(process.cwd())
  const isPro = process.env.VITE_PRO === 'true'
  const ASSETS_DIR = isPro ? 'pro/assets' : 'assets'
  const codeName = humanId({ separator: '-', capitalize: false })

  return {
    root: 'frontend',
    base: isDevelopment ? `/wp-content/plugins/${folderName}/frontend/` : '',
    assetsDir: 'assets',
    define: {
      ...(!isTest && { SERVER_VARIABLES: `window.${SERVER_VARIABLES}` })
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          presets: ['jotai/babel/preset'],
          plugins: ['@emotion/babel-plugin']
        },
        jsxRuntime: 'automatic'
      }),
      tsconfigPaths(),
      generateBuildCodeNamePlugin({ codeName, dir: ASSETS_DIR }),
      checkSubmoduleUpdatesPlugin()
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: normalizePath(path.resolve(__dirname, './frontend/_plugin-commons/resources/css/antd-reset.css')),
      //       dest: `../${ASSETS_DIR}/`
      //     }
      //   ]
      // })
    ],

    build: {
      emptyOutDir: true,
      outDir: `../${ASSETS_DIR}`,
      rollupOptions: {
        input: path.resolve(import.meta.dirname, 'frontend/src/main.tsx'),
        output: {
          generatedCode: {
            preset: 'es2015',
            arrowFunctions: true,
            constBindings: true,
            objectShorthand: true
          },
          entryFileNames: `main-${codeName}.js`,
          manualChunks: {
            antd: ['antd'],
            'react-query': ['@tanstack/react-query'],
            router: ['react-router-dom'],
            'css-in-js': ['@emotion/react']
          },
          chunkFileNames: fInfo => {
            if (fInfo?.facadeModuleId?.includes('lucide-react')) {
              return `icons/[name]-icon.js`
            }
            return `[name]-[hash].js`
          },
          assetFileNames: fInfo => {
            const pathArr = fInfo?.name?.split('/')
            const fileName = pathArr?.at(-1)

            if (fileName === 'main.css') {
              return `main-${PLUGIN_SLUG}-${codeName}.css`
            }

            if (fileName === 'logo.svg') {
              return `logo.svg`
            }

            return `${PLUGIN_SLUG}-${hash()}.[ext]`
          }
        }
      }
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      root: './frontend/src',
      setupFiles: ['./config/test.setup.ts'],
      testTimeout: 10_000
    },
    ssr: {
      noExternal: isTest ? ['@vitejs/plugin-react'] : []
    },
    server: {
      ...(DEV_SSL === 'true' && {
        https: {
          key: DEV_SSL_KEY_PATH,
          cert: DEV_SSL_CERT_PATH
        }
      }),
      cors: true, // required to load scripts from custom host
      strictPort: true, // strict port to match on PHP side
      port: 3000,
      hmr: { host: 'localhost' }
    }
  }
})

function hash() {
  return Math.round(Math.random() * (999 - 1) + 1)
}
