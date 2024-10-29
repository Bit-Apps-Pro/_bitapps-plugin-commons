#!/usr/bin/env node

import fse from 'fs-extra'
import process from 'node:process'

console.log('🔄️ Syncing plugin common files...')

if (process.cwd().includes('_bitapps-plugin-commons')) {
  process.chdir('..')
}

console.log('Current Working Dir', process.cwd())

await Promise.all([
  fse.emptyDir('./frontend/_plugin-commons'),
  fse.emptyDir('./.config/_plugin-commons'),
  fse.emptyDir('./pro/backend/_plugin-commons')
])

console.log('✅ Delete existing plugin common files')

await Promise.all([
  fse.ensureDir('./frontend/_plugin-commons'),
  fse.ensureDir('./.config/_plugin-commons'),
  fse.ensureDir('./pro/backend/_plugin-commons')
])

await Promise.all([
  fse.copy('./_bitapps-plugin-commons/frontend', './frontend/_plugin-commons', { overwrite: true }),
  fse.copy('./_bitapps-plugin-commons/configs', './.config/_plugin-commons', { overwrite: true }),
  fse.copy('./_bitapps-plugin-commons/backend/pro', './pro/backend/_plugin-commons', { overwrite: true })
  // fse.copy('./_bitapps-plugin-commons/backend/free', '/backend/_plugin-commons', { overwrite: true })
])
  .then(() => {
    console.log('✅ Plugin common files synced')
  })
  .catch(error => {
    console.error('❌ Error syncing plugin common files', error)
  })
