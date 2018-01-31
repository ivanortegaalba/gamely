const colors = {
  light: ['#9cacba', '#bac8d3', '#c8d2da', '#eef3f7'],
  dark: ['#23272a', '#41474c', '#59636b'],

  white: '#fff',
  black: '#000',

  green: ['#00a265', '#00c97e', '#52d7a5', '#a9ebd2'],

  yellow: ['#dea64b', '#ffb867', '#ffd99c', '#ffe1be'],

  blue: ['#008aab', '#00a5c9', '#43caea', '#cdf2ff'],

  red: ['#bb2e3e', '#ed4a59', '#fc7b87', '#fcaab2'],
};

colors.default = colors.dark;
colors.primary = colors.blue;
colors.danger = colors.red;
colors.success = colors.green;
colors.warning = colors.yellow;

export { colors };
