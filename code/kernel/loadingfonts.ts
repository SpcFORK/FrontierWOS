import L$ from "./L$";

// @ Loading Fonts
var resFont = async (fontName = '', as = fontName) => {
  return loadFont(
    as,
    L$('code/fonts/' + fontName + '.ttf')
  );
};

var handleRubik = async (instance = '') => {
  let newp = 'Rubik_' + instance;
  return resFont(
    newp + '/' + newp,
    newp
  );
};

// ---

let tempFontArr = [
  'Vinyl',
  'Spray_Paint',
  'Broken_Fax',
  // 'Iso',
  'Puddles',
];

tempFontArr.map((inst) => handleRubik(inst));

export { }