export const humanFileSize = (size: number) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  let surfix = ['B', 'kB', 'MB', 'GB', 'TB'][i]
  let value = size / Math.pow(1024, i)
  
  return value.toFixed(2) + " " + surfix
};