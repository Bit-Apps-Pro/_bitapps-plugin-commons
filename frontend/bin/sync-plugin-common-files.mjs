#!/usr/bin/env node

import fse from 'fs-extra'
import process from 'node:process'

console.log('🔄️ Syncing plugin common files...')

if (process.cwd().includes('_bitapps-plugin-commons')) {
  process.chdir('..')
}

console.log('Current Work Dir', process.cwd())

fse.copy('./_bitapps-plugin-commons/frontend', './frontend/_plugin-commons', { overwrite: true })
// fse.copy('./_bitapps-plugin-commons/backend/free', '/backend/_plugin-commons', { overwrite: true })
fse.copy('./_bitapps-plugin-commons/backend/pro', './pro/backend/_plugin-commons', { overwrite: true })
