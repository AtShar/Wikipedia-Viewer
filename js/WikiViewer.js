$(document).ready(function() {
  $("#searchIcon").click(function() {

    $("#searchIcon").addClass("hideItem");

    $("#queryDiv").removeClass("hideItem");

    $("#searchInput").removeClass("shrinkItem");
    $("#searchInput").addClass("expandItem");

  });

  $("#closeSearch").click(function() {

    $("#searchInput").removeClass("expandItem");
    var $searchInput = reset($("#searchInput"));
    $searchInput.addClass("shrinkItem");
    setTimeout(function() {
      $("#searchIcon").removeClass("hideItem");
      $("#searchedContent").addClass("hideItem");
      $("#queryDiv").addClass("hideItem");
    }, 250);
    $("#subContainer").addClass('vertical-center-row');

  });

  $('#searchInput').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

      var endpoint = "https://en.wikipedia.org/w/api.php?action=query&gsrnamespace=0&format=json&prop=extracts&exintro=&exsentences=1&gsrlimit=15&generator=search&origin=*&plimit=max&exlimit=max&gsrsearch=";

      var title = $('#searchInput').val();
      var extraParam = "&format=jsonp&origin=*";
      $.getJSON(endpoint + title, function(json) {

        $.each(json.query.pages, function(key, value) {
          console.log(value);
          $("#searchedContent").append("<div class='panel panel-default' ><a target='_blank' href='http://en.wikipedia.org/?curid=" + value.pageid + "'><h3 class='panel-title'>" + value.title + "</h3><div class='panel-body'>" + value.extract + "</div></a></div>");
        });
        $("#subContainer").removeClass('vertical-center-row');
      });
    }
  });
});

function reset($elem) {
  $elem.before($elem.clone(true));
  var $newElem = $elem.prev();
  $elem.remove();
  return $newElem;
} // end reset()