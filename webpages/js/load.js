var structure = [
  {w: 3, h: 1, x: 0, y: 0},
  {w: 3, h: 3, x: 0, y: 1},
  {w: 3, h: 2, x: 3, y: 0},
  {w: 3, h: 2, x: 3, y: 2},
  {w: 3, h: 3, x: 6, y: 0},
  {w: 3, h: 1, x: 6, y: 3}
];
var get = document.getElementById('myGrid');
var myGrid = {
  currentSize:4,
  direction: 'vertical'
};

$(function() {
  // myGrid.buildElements($('#grid'), structure);

  $('#myGrid').gridList({
    lanes: 4,
    direction: 'horizontal'
    // widthHeightRatio: 264 / 294,
    // widthHeightRatio: 35/30,
    // heightToFontSizeRatio: 0.25
  });
});
