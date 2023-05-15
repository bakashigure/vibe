const { platform, arch } = process
const { execSync } = require('child_process')
const { existsSync } = require('fs')
const PLATFORM_NAME = platform

let nativeBinding = null
let loadError = null
let libName = `vibe.${PLATFORM_NAME}-${arch}.node`

if(!existsSync(libName)) {
  throw new Error(`No native binding found for ${libName}`)
}

try {
  nativeBinding = require(`./${libName}`)
} catch (e) {
  console.log(e)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { applyEffect, clearEffects, forceTheme, setup } = nativeBinding

module.exports.applyEffect = applyEffect
module.exports.clearEffects = clearEffects
module.exports.forceTheme = forceTheme
module.exports.setup = setup