# Storify Templates

The Storify editor on [storify.com](http://storify.com) allows you to dynamically integrate social media content from around the web.  
This Template Repository provides a way to contribute a template and use it on Storify.

---------------------

## Try It
KenBurns template: [dl.dropbox.com/u/1702667/github/templates/kenburns/index.html](http://dl.dropbox.com/u/1702667/github/templates/kenburns/index.html) .  
You can add the url of any story after the hash:  
e.g. [dl.dropbox.com/u/1702667/github/templates/kenburns/index.html#http://storify.com/xdamman/why-do-you-do-what-you-do](http://dl.dropbox.com/u/1702667/github/templates/kenburns/index.html#http://storify.com/xdamman/why-do-you-do-what-you-do) .

## How to make a template?

See this slideshare presentation: 
<div style="width:425px" id="__ss_7319023"> <strong style="display:block;margin:12px 0 4px"><a href="http://www.slideshare.net/xdamman/storytelling-using-javascript-html5-css3" title="Storytelling using Javascript HTML5 CSS3">Storytelling using Javascript HTML5 CSS3</a></strong> <object id="__sse7319023" width="425" height="355"> <param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=html5-110319152327-phpapp01&stripped_title=storytelling-using-javascript-html5-css3&userName=xdamman" /> <param name="allowFullScreen" value="true"/> <param name="allowScriptAccess" value="always"/> <embed name="__sse7319023" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=html5-110319152327-phpapp01&stripped_title=storytelling-using-javascript-html5-css3&userName=xdamman" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed> </object> <div style="padding:5px 0 12px"> </div> </div>

Just create a new HTML page and request the JSON of the story using jQuery:

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
  
    <div id="story">
      <div id="header">
        <h1>Story title</h1>
        <h2>Story description</h2>
        <img id="byline" width=16 height=16 src="" border=0 />
        <h3>Byline</h3>
      </div>
    </div>
  
    <script>
    var storyurl = 'http://storify.com/torontostar/online-reaction-to-libya-chaos';
    
    // We use this so that you can override the storyurl by appending it after the hash
    // e.g. index.html#http://storify.com/xdamman/why-do-you-do-what-you-do
    if (window.location.hash && window.location.hash.match(/http:\/\/storify\.com\//)) storyurl = window.location.hash.substr(1);

    // We fetch the JSON. 
    $.getJSON(storyurl + '.json?callback=?', function(json) {
    	renderStory(json);
    });

    // We render the story
    function renderStory(story) {

    	$('#story #header h1').html(story.title);
    	$('#story #header h2').html(story.description);
    	$('#story #header h3').html('By ' + story.author.name);
    	$('#story #header img#byline').attr("src", story.author.avatar);
  
    	// And so on...

    	// You can check in the console all the available properties from the JSON
    	console.log("Story: ", story);
  	}
    </script>

## How to embed a story using a template on my site?

We are working on a more streamlined process but for now the easiest way is to use an iframe:
    <iframe src="http://dl.dropbox.com/u/1702667/sites/kenburns/index.html#http://storify.com/xdamman/why-do-you-do-what-you-do" width=950 height=550 frameborder=no></iframe>
(don't forget to adapt the width and height to the template that you use)

## How to Contribute

1. Clone this repository.
1. Use one of the samples provided to create your own template.
1. Submit a pull request on GitHub.

