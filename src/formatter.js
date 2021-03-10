function formatDiffToStylish(diff) {
  const entries = Object.entries(diff);

  const result = entries.map(([key, value]) => {
    const resultLine = {
      unchanged: `    ${key}: ${value.newValue}`,
      added: `  + ${key}: ${value.newValue}`,
      deleted: `  - ${key}: ${value.currentValue}`,
      changed: [
        `  - ${key}: ${value.currentValue}`,
        `  + ${key}: ${value.newValue}`,
      ].join('\n'),
    };

    return resultLine[value.status];
  }).join('\n');

  return `{\n${result}\n}`;
}

function formatDiff(diff, format) {
  switch (format) {
    case 'stylish':
      return formatDiffToStylish(diff);

    default:
      return diff;
  }
}

export default formatDiff;
