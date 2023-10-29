// decode uint24 to formula
export function decodeDoorContent(
  currentValue?: number,
  changeData?: number
): string {
  if (!currentValue || !changeData) {
    return "";
  }

  // get first uint8
  const operator = changeData >> 16;
  const change = changeData & 0xff;

  const result = operator === 0 ? currentValue + change : currentValue - change;

  // raffle to show one of + - * /
  const r = Math.random();
  if (r < 0.25) {
    // show +
    const anoNumber = result - currentValue;
    if (anoNumber >= 0) {
      return `x + ${anoNumber}`;
    } else {
      return `x + (${anoNumber})`;
    }
  } else if (r < 0.5) {
    // show -
    const anoNumber = currentValue - result;
    if (anoNumber >= 0) {
      return `x - ${anoNumber}`;
    } else {
      return `x - (${anoNumber})`;
    }
  } else if (r < 0.75) {
    // show *
    const anoNumber = result / currentValue;
    if (anoNumber >= 0) {
      return `x * ${Number(anoNumber.toFixed(2))}`;
    } else {
      return `x * (${Number(anoNumber.toFixed(2))})`;
    }
  } else {
    // show /
    const anoNumber = currentValue / result;
    if (anoNumber > 0) {
      return `x / ${Number(anoNumber.toFixed(2))}`;
    } else {
      return `x / (${Number(anoNumber.toFixed(2))})`;
    }
  }
}
