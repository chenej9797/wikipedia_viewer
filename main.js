$(document).ready(function() {
  var submitIcon = $(".searchbox-icon");
  var inputBox = $(".searchbox-input");
  var searchBox = $(".searchbox");
  var submitBg = $(".searchbox-submit");
  var submitImg = $(".iconImg");
  var isOpen = false;
  submitIcon.click(function() {
    var searchTerm = $(".searchbox-input").val();
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchTerm +
      "&format=json&callback=?";

    if (isOpen == false) {
      searchBox.addClass("searchbox-open");
      submitIcon.addClass("");
      submitBg.addClass("submitSm");
      submitImg.addClass("iconSm");
      inputBox.focus();
      isOpen = true;
    } else {
      searchBox.removeClass("searchbox-open");
      submitBg.removeClass("submitSm");
      submitImg.delay(10000).removeClass("iconSm");
      $.ajax({
        type: "GET",
        url: url,
        async: false,
        dataType: "json",
        success: function(data) {
          $("#output").html("");
          for (var i = 0; i < data[1].length; i++) {
            $("#output").prepend(
              "<a href=" +
                data[3][i] +
                "><li>" +
                data[1][i] +
                "<p>" +
                data[2][i] +
                "</p></li></a>"
            );
          }
        },
        error: function(errorMessage) {
          console.log("error");
        }
      });

      inputBox.focusout();
      isOpen = false;
    }
  });
  submitIcon.mouseup(function() {
    return false;
  });
  searchBox.mouseup(function() {
    return false;
  });
  $(document).mouseup(function() {
    if (isOpen == true) {
      $(".searchbox-icon").css("display", "block");
      submitIcon.click();
    }
  });
});
