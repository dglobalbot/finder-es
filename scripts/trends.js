
var simpleRSS = (function () {


  var feedsNodes = document.querySelectorAll('[data-rss-feed]');


  var feeds = [].slice.call(feedsNodes);

  for (var i = 0; i < feeds.length; i++) {

    var container = feedsNodes[i];


    var url = container.getAttribute('data-rss-feed');


    var addLink = container.getAttribute('data-rss-link-titles') || 'true';

    var titleWrapper = container.getAttribute('data-rss-title-wrapper') || 'h2';


    var max = container.getAttribute('data-rss-max') || 14;


    var script = document.createElement('script');

    script.src = document.location.protocol + '//api.rss2json.com/v1/api.json?api_key=xknfdsmq6fs5h8uqrxqco7ydqdg9f7c0eoefml0t&count=14&callback=simpleRSS.handleJSON&rss_url=' + encodeURIComponent(url);

    document.querySelector('head').appendChild(script);


  }


  function handleJSON(data) {

    if (data.feed && data.items) {
      var docFrag = document.createDocumentFragment();
      for (var i = 0; i < data.items.length; i++) {
        var e = data.items[i];
        var tempNode = document.createElement('li');


        var template = '<a href="#" title="' + e.title + '" onclick="putValue(this.title)">' + e.title + '</a>';

        if (addLink === 'false') {
          template = '<h3>' + e.title + '</h3>' + e.content;
        }

        if (i < max) {
          tempNode.innerHTML = template;
          docFrag.appendChild(tempNode);
        }
      }

      container.appendChild(docFrag);

    }
  }


  return {
    handleJSON: handleJSON
  }

})();


function putValue(term) {

  inputSubmit.value = term;
  inputFocus();
  checkValue();
}