const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { platform, arch } = require('os')
const PLATFORM_NAME = platform()
const ARCH_NAME = arch()
const npm_package_version = require('./package.json').version

let libName
switch (PLATFORM_NAME) {
  case 'darwin':
    libName = `vibe.darwin-${ARCH_NAME}.node`
    break
  case 'win32':
    libName = `vibe.win32-${ARCH_NAME}.node`
    break
  case 'linux':
      libName = `vibe.linux-${ARCH_NAME}.node`
    break
  default:
    throw new TypeError('Operating system not currently supported or recognized by the build script')
}


if (process.env.npm_config_build_from_source || process.env.BUILD_VIBE_FROM_SOURCE) {

  execSync('npm run build:release', {
    stdio: 'inherit',
    env: process.env,
  })
    // rename index.node to libName
    execSync(`mv index.node ${libName}`)
} else {
    // download from github
    if (!existsSync(libName)) { 
        console.log('Downloading from github')
        execSync(`curl -o ${libName} "https://github.com/bakashigure/vibe/releases/download/v${npm_package_version}/${libName}"`)
    } else {
        console.log('Already downloaded')
    }
}