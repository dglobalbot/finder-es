$(function () {
    $("#search-input").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://api.bing.com/osjson.aspx?market=en-US&query=" + encodeURIComponent(request.term) + "&JsonType=callback&JsonCallback=?",
                dataType: "jsonp",

                success: function (data) {
                    var suggestions = [];
                    $.each(data[1], function (i, val) {
                        suggestions.push(val);
                    });
                    response(suggestions.slice(0, 5));

                }
            });
        }
    });
});