#!/usr/bin/env node
/* eslint-disable unicorn/prefer-top-level-await */

import fse from 'fs-extra'
import process from 'node:process'

console.log('🔄️ Syncing plugin common files...')

if (process.cwd().includes('_bitapps-plugin-commons')) {
  process.chdir('..')
}

console.log('Current Working Dir', process.cwd())

Promise.all([
  fse.emptyDir('./frontend/_plugin-commons'),
  fse.emptyDir('./.config/_plugin-commons'),
  fse.emptyDir('./pro/backend/_plugin-commons')
])

console.log('✅ Delete existing plugin common files')

Promise.all([
  fse.copy('./_bitapps-plugin-commons/frontend', './frontend/_plugin-commons', { overwrite: true }),
  fse.copy('./_bitapps-plugin-commons/configs', './.config/_plugin-commons', { overwrite: true }),
  // fse.copy('./_bitapps-plugin-commons/backend/free', '/backend/_plugin-commons', { overwrite: true })
  fse.copy('./_bitapps-plugin-commons/backend/pro', './pro/backend/_plugin-commons', { overwrite: true })
])
  .then(() => {
    console.log('✅ Plugin common files synced')
  })
  .catch(error => {
    console.error('❌ Error syncing plugin common files', error)
  })
