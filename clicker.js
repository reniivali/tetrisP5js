//this is the javascript for the CLICKER side of the game
//vars
var open = false;
//functs {
//onclick handlers
function openClick() {
  if (!open) {
    $(this).css("margin-top", "2px;");
    open = true;
  }
}

function closeClick() {
  $("#clickContain").css("margin-top", "-400px;");
  open = false;
}

//updating elements
function update1F() {
  if (open) {
    $("#clickClose").show();
  } else {
    $("#clickClose").hide();
  }
}