export const readItem = (key: string, isJson: boolean = true): string | object | null => {
  const keyData = localStorage.getItem(key)
  let result: object | string | null = keyData
  if (isJson && keyData) result = JSON.parse(keyData)
  return result
}

export const storageItem = (key: string, data: string | object, isObject: boolean = false) => {
  let storageData: string | object = data
  if (typeof data === 'object') storageData = JSON.stringify(data)
  localStorage.setItem(key, storageData as string)
}

export const deleteItem = (key: string) => {
  localStorage.removeItem(key)
}
