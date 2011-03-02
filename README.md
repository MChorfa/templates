# Storify Templates

The Storify editor on http://storify.com allows you to dynamically integrate social media content from around the web.
This Template Repository provides a way to contribute a template and use it on Storify.

---------------------

## Try It

## How to make a template?

Just create a new HTML page and request the JSON of the story using jQuery:
<code>
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
  if (window.location.hash && window.location.hash.match(/http:\/\/storify\.com\//)) storyurl = window.location.hash.substr(1);
  else storyurl = 'http://storify.com/torontostar/online-reaction-to-libya-chaos';

  $.getJSON(storyurl + '.json?callback=?', function(json) {
  	renderStory(json);
  });

  function renderStory(story) {

  	$('#story #header h1').html(story.title);
  	$('#story #header h2').html(story.description);
  	$('#story #header h3').html('By ' + story.author.name);
  	$('#story #header img#byline').attr("src", story.author.avatar);
  
  	// And so on...

  	// You can check in the console all the available data from the JSON
  	console.log("Story: ", story);
	}
  </script>
</code>


## How to Contribute

1. Clone this repository.
1. Use one of the samples provided to create your own source.
1. Test your own source using the bookmarklet.
1. Submit a pull request on on GitHub.

