export const stringToBoolean = (defaultValue?: string): boolean => {
  if (!defaultValue) return false

  return defaultValue.toLowerCase() === 'true'
}
