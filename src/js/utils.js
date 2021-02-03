export function round2digitsToText(num) {
  const rounded = Math.round(parseFloat(num) * 100) / 100;
  const parts = rounded.toString().split('.');
  if (parts.length === 1) {
    parts.push('00');
  } else {
    while (parts[1].length !== 2) {
      parts[1] += '0';
    }
  }
  return parts.join('.');
}
