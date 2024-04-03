export const pastelColors = [
  "#FF0000", // Red
  "#007FFF", // Azure
  "#008000", // Green
  "#008080", // Teal
  "#32CD32", // Lime Green
  "#800080", // Purple
  "#FF00FF", // Magenta
  "#800000", // Maroon
  "#A52A2A", // Brown
  "#D2691E", // Chocolate
  "#BC8F8F", // Rosy Brown
  "#FFD700", // Gold
  "#FF69B4", // Hot Pink
  "#CD5C5C", // Indian Red
  "#FF6347", // Tomato
  "#FFA07A", // Light Salmon
  "#FFA500", // Orange
  "#FF8C00", // Dark Orange
  "#FF4500", // Orange Red
  "#b8ab32", // Lavender
  "#F0E68C", // Khaki
  "#A9A9A9", // Dark Gray
  "#708090", // Slate Gray
  "#DDA0DD", // Plum
  "#800000", // Maroon
  "#808000", // Olive
  "#00FFFF", // Cyan
];

export const letterToNumber = (letter) => {
  const uppercaseLetter = letter.toUpperCase();
  const asciiCode = uppercaseLetter.charCodeAt(0);
  const numericValue = asciiCode - 64; // Subtract ASCII code of 'A' (65 for uppercase letters)
  return numericValue;
};
