export function isEmpty(value): boolean {
  if (isArray(value)) { return !value.length; }
  if (isObject(value)) { return !Object.keys(value).length; }
  return value === undefined || value === null || value === '';
}

export function isArray(item: any): boolean {
  return Array.isArray(item) || Object.prototype.toString.call(item) === '[object Array]';
}

export function isObject(item: any): boolean {
  return item !== null && typeof item === 'object' && Object.prototype.toString.call(item) === '[object Object]';
}

export function isBoolean(value, option: any = null) {
  if (option === 'strict') { return value === true || value === false; }
  if (option === true) {
    return value === true || value === 1 || value === 'true' || value === '1';
  }
  if (option === false) {
    return value === false || value === 0 || value === 'false' || value === '0';
  }
  return value === true || value === 1 || value === 'true' || value === '1' ||
    value === false || value === 0 || value === 'false' || value === '0';
}

export function isImage(file: File) {
  return file && file.type.split('/')[0] === 'image';
}
