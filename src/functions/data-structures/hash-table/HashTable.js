export const hash = (key, arraylength) => {
  let total = 0;
  let PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * PRIME + value) % arraylength;
  }
  return total;
};
