export default function findPalette(palette, currentPaletteId) {
  return palette.find(paletteObj => paletteObj.id === currentPaletteId);
}
