import fse from 'fs-extra'

fse.copy('./frontend', '../frontend/_plugin-commons', { overwrite: true })
fse.copy('./backend/free', '../backend/_plugin-commons', { overwrite: true })
fse.copy('./backend/pro', '../pro/backend/_plugin-commons', { overwrite: true })
