// var structure = [
//   {w: 3, h: 1, x: 0, y: 0},
//   {w: 3, h: 3, x: 0, y: 1},
//   {w: 3, h: 2, x: 3, y: 0},
//   {w: 3, h: 2, x: 3, y: 2},
//   {w: 3, h: 3, x: 6, y: 0},
//   {w: 3, h: 1, x: 6, y: 3}
// ];
// var get = document.getElementById('myGrid');
// var myGrid = {
//   currentSize:4,
//   direction: 'vertical'
// };

setInterval(draw(), 1000);

function draw() {

  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

  $(function() {
    // myGrid.buildElements($('#grid'), structure);
    if (width > 720) {
      $('#myGrid').gridList({
        lanes: 9 ,
        direction: 'vertical'
        // widthHeightRatio: 264 / 294,
        // widthHeightRatio: 35/30,
        // heightToFontSizeRatio: 0.25
      });
    }
    else if (width > 480 && width < 720) {
      // $("#time").attr("data-w", "2");
      // $("#eta").attr("data-w", "2");
      // $("#news").attr("data-w", "2");
      // $("#mail").attr("data-w", "2");
      // $("#social").attr("data-w", "2");
      // $("#weather").attr("data-w", "2");
      $('#myGrid').gridList({
        lanes: 6 ,
        direction: 'vertical'
        // widthHeightRatio: 264 / 294,
        // widthHeightRatio: 35/30,
        // heightToFontSizeRatio: 0.25
      });
    }
    else if (width < 480 ) {
      // $("#time").attr("data-w", "2");
      // $("#eta").attr("data-w", "2");
      // $("#news").attr("data-w", "2");
      // $("#mail").attr("data-w", "2");
      // $("#social").attr("data-w", "2");
      // $("#weather").attr("data-w", "2");
      $('#myGrid').gridList({
        lanes: 3 ,
        direction: 'vertical'
        // widthHeightRatio: 264 / 294,
        // widthHeightRatio: 35/30,
        // heightToFontSizeRatio: 0.25
      });
    }
  });
}
