/// <reference types="vite/client" />
// import commonjs from '@rollup/plugin-commonjs'
import react from '@vitejs/plugin-react'
// import incstr from 'incstr'
import path from 'path'
// import csso from 'postcss-csso'
import { defineConfig, loadEnv } from 'vite'
import { emptyFoldersPlugin, replaceProImports, generateBuildCodeNamePlugin } from 'bitapps-dev-utils'
import tsconfigPaths from 'vite-tsconfig-paths'
import { humanId } from 'human-id'
// const nextId = incstr.idGenerator()
// let chunkCount = 0
function hash() {
  return Math.round(Math.random() * (999 - 1) + 1)
}

export default defineConfig(({ mode }) => {
  const {
    SERVER_VARIABLES,
    PLUGIN_SLUG,
    PLUGIN_SLUG_PRO,
    DEV_SSL,
    DEV_SSL_CERT_PATH,
    DEV_SSL_KEY_PATH
  } = loadEnv(mode, process.cwd(), '')

  const isDev = mode === 'development' || mode === 'test'
  const isTest = mode === 'test'
  const folderName = path.basename(process.cwd())
  const ASSETS_DIR = 'assets'
  const PLUGIN_ASSETS_DIR = `${PLUGIN_SLUG}/${ASSETS_DIR}`
  const PRO_PLUGIN_ASSETS_DIR = `${PLUGIN_SLUG_PRO}/${ASSETS_DIR}`
  const codeName = humanId({ separator: '-', capitalize: false, })

  return {
    root: 'src',
    // base: isDev ? `/wp-content/plugins/${folderName}/frontend/src/` : '',
    assetsDir: 'assets',
    define: {
      ...(!isTest && { SERVER_VARIABLES: `window.${SERVER_VARIABLES}` })
    },
    plugins: [
      emptyFoldersPlugin([`./${ASSETS_DIR}`, `./pro/${ASSETS_DIR}`]),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          presets: ['jotai/babel/preset'],
          plugins: ['@emotion/babel-plugin']
        },
        jsxRuntime: 'automatic'
      }),
      replaceProImports({ serverVarName: SERVER_VARIABLES }),
      tsconfigPaths(),
      generateBuildCodeNamePlugin({ codeName, dir: ASSETS_DIR })
    ],
    // build: {
    //   rollupOptions: {
    //     input: path.resolve(__dirname, 'frontend/src/main.tsx'),
    //     output: {
    //       generatedCode: {
    //         preset: 'es2015',
    //         arrowFunctions: true,
    //         constBindings: true,
    //         objectShorthand: true
    //       },
    //       entryFileNames: `${PLUGIN_ASSETS_DIR}/main-${codeName}.js`,
    //       // manualChunks: createManualChunks,
    //       manualChunks: {
    //         antd: ['antd'],
    //         'react-query': ['@tanstack/react-query'],
    //         router: ['react-router-dom'],
    //         'css-in-js': ['@emotion/react'],
    //       },
    //       chunkFileNames: fInfo => {
    //         // if (fInfo.name.includes('pro-chunk')) {
    //         //   return `${PRO_PLUGIN_ASSETS_DIR}/[name]-[hash].js`
    //         // }
    //         if (fInfo.name.includes('pro-module')) {
    //           return `${PRO_PLUGIN_ASSETS_DIR}/[name]-[hash].js`
    //         }
    //         if (fInfo?.facadeModuleId?.includes('lucide-react')) {
    //           return `${PLUGIN_ASSETS_DIR}/icons/[name]-icon.js`
    //         }
    //         return `${PLUGIN_ASSETS_DIR}/[name]-[hash].js`
    //       },
    //       assetFileNames: fInfo => {
    //         const pathArr = fInfo?.name?.split('/')
    //         const fileName = pathArr?.at(-1)

    //         if (fileName === 'main.css') {
    //           return `${PLUGIN_ASSETS_DIR}/main-${codeName}.css`
    //         }

    //         if (fileName === 'logo.svg') {
    //           return `${PLUGIN_ASSETS_DIR}/logo.svg`
    //         }

    //         return `${PLUGIN_ASSETS_DIR}/${PLUGIN_SLUG}-${hash()}.[ext]`
    //       }
    //     }
    //   }
    // },
    test: {
      // globals: true,
      environment: 'jsdom',
      root: './src',
      setupFiles: ['./config/test.setup.ts']
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
