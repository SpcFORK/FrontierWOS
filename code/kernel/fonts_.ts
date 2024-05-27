const fonts_ = {
  CASE: (fontName = '') => 'Rubik_' + fontName,
  Vinyl: () => fonts_.CASE('Vinyl'),
  Spray_Paint: () => fonts_.CASE('Spray_Paint'),
  Broken_Fax: () => fonts_.CASE('Broken_Fax'),
  // Iso: () => fonts_.CASE('Iso'),
  Puddles: () => fonts_.CASE('Puddles'),
};
export default fonts_