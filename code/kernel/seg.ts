export default function segPosCenter(pos: number, divs: number, width: number, ind: number) {
  return (pos / divs) * ind + (width / 2);
}