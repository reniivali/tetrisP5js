//this is the javascript for the CLICKER side of the game
//vars
var open = false;
//functs

//onload (will be called in tetris.js)
function clicker() {
  //onclick handlers
  $("#clickContain").click(function () {
    if (!open) {
      $(this).css("margin-top", "2px;");
      open = true;
    }
  });

  $("#clickClose").click(function () {
    $("#clickContain").css("margin-top", "-400px;");
    open = false;
  });

  //updating elements
  function update1F() {
    if (open) {
      $("#clickClose").show();
    } else {
      $("#clickClose").hide();
    }
  }
  setInterval(update1F, 1000 / 60);
}
