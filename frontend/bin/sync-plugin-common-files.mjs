import fse from 'fs-extra'

console.log('Syncing plugin common files...')

fse.copy('./_bitapps-plugin-commons/frontend', './frontend/_plugin-commons', { overwrite: true })
// fse.copy('./_bitapps-plugin-commons/backend/free', '/backend/_plugin-commons', { overwrite: true })
fse.copy('./_bitapps-plugin-commons/backend/pro', './pro/backend/_plugin-commons', { overwrite: true })
