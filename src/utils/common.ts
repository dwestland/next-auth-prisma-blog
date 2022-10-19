export function requireEnvVariable(key: string) {
  const value = process.env[key]
  if (value) {
    return value
  }
  throw new Error(`Environment variable ${key} was not defined!`)
}

export function getSixDigitRandom() {
  return Math.random().toString().substring(2, 8)
}
