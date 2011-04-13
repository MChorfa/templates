$(document).ready(function() {

	function onbefore(curr, next, opts) {
	  $(next).show();
	  $(next).children('.quote, .photoContainer, .textP').center();
	  
		$(next).children('.photoSlide').each(function() {
			if ($(this).hasClass('notResized')) {
				$(this).cjObjectScaler({
					method: "fit"
				});
				$(this).removeClass('notResized');
			}
		});
		var background = "url('" + $(next).find(".background").attr("src") + "')";
		var background_tile_flag = $(next).find(".background").attr("caption");
		var background_color = "#" + $(next).find(".background").attr("title");
		if (background != "none") {
			if (background_tile_flag == "true") {
				$(next).css({
					"background": background + " " + background_color + " repeat"
				})
			} else {
				$(next).css({
					"background": background + " " + background_color + " no-repeat"
				})
			}
		}
	}

	function checkKey(e) {
		switch (e.keyCode) {
		case 37:
			// Left
			$("#twitterShow").cycle("prev");
			break;
		case 39:
			// Right
			$("#twitterShow").cycle("next");
			break;
		case 17:
			$('#help').fadeIn(10).delay(3000).fadeOut('fast');
		case 80:
			$("#twitterShow").cycle("toggle");
		default:
			// Do nothing  
		}
	}

	if ($.browser.mozilla) {
		$(document).keypress(checkKey);
	} else {
		$(document).keydown(checkKey);
	}

	$("#twitterShow").touchwipe({
		wipeLeft: function() {
			$("#twitterShow").cycle("next");
		},
		wipeRight: function() {
			$("#twitterShow").cycle("prev");
		}
	});

	var hash = window.location.hash;
	var permalink_token = hash.split("#")[1];

  $(".timeago").timeago();

	var previous_id = '';
	var previous_length = 0;

	function getStoryElementHTML(element) {	  
	  var layout = '<div class="slideWrapper '+element.elementClass+'Element">';
	  	  
		switch (element.elementClass) {
  		case "video":
  		  if(element.source == "youtube") {
  		    var youtubeVideoID = element.permalink.replace("http://www.youtube.com/watch?v=",'');
  		    layout += '<object width="'+document.width+' height="'+document.height+'">\n\
          <param name="movie" value="http://www.youtube.com/v/'+youtubeVideoID+'?fs=1&autoplay=1&controls=0"</param>\n\
          <param name="allowFullScreen" value="true"></param>\n\
          <param name="allowScriptAccess" value="always"></param>\n\
          <embed src="http://www.youtube.com/v/'+youtubeVideoID+'?fs=1&autoplay=1&controls=0"\n\
            type="application/x-shockwave-flash"\n\
            allowfullscreen="true"\n\
            allowscriptaccess="always"\n\
            width="'+document.width+'" height="'+document.height+'">\n\
          </embed>\n\
          </object>';
        
          layout += '<iframe id="player" type="text/html" width="'+document.width+'" height="'+document.height+'"\n\
            src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1&origin=storify.com"\n\
            frameborder="0">';
  		  }
  		  break;
  		case "photo":
  			var imgUrl = element.metadata.url_o || element.metadata.url_m || element.metadata.url;
  			layout += '<img class="photoSlide notResized" src="' + imgUrl + '" /><aside class="attribution">' + element.metadata.title + '<br/>by: ' + element.author.name + '</aside>';
  			break;
  		case "text":
  		  layout += '<p class="textP">'+element.description.sanitizeTags('<a>')+'</p>';		  
  		  break;
      case "quote":
        console.log(element);

  			var template = '<div class="quote"><p>' + element.description + '</p><aside class="user"><img src="' + element.favicon + '" /><div class="username"><a href="' + element.author.href + '">' + element.author.name + '</a></div><div class="name">' + element.title + '</div></aside><br style="clear:both;"/></div>';

        layout += template + '</div>';
  			break;
  		case "tweet":
  		  var background_image;
  			if (element.metadata.user.profile_background_image_url) {
  				background_image = element.metadata.user.profile_background_image_url;
  			} else {
  				background_image = "none";
  			}
			
  			element.metadata.user.name = element.metadata.user.name || '';

  			var template = '<div class="quote"><p>' + element.description + '</p><aside class="meta"><small class="timeago">' + Storify.utils.displayDate(element.metadata.created_at) + '</small></aside>\n\
  							<aside class="user"><img alt="storify.com" src="http://www.extension.org/mediawiki/files/a/a7/Twitter_logo_header.png" width="144" height="33" class="twitterLogo" style="float: right;"/><img src="' + element.metadata.user.profile_image_url + '" width=48 /><div class="username"><a href="http://twitter.com/' + element.author.username + '">' + element.author.username + '</a></div><div class="name">' + element.metadata.user.name + '</div></aside><br style="clear:both;"/><img class="background" caption="' + element.metadata.user.profile_background_tile + '" title="' + element.metadata.user.profile_background_color + '" src="' + background_image + '" style="width:0;height:0;display:none;"/></div>';

  			var urls, image_url;
  			var imageShortURL = Storify.utils.parseFirstURL(element.description);
  			var image_url = (imageShortURL) ? Storify.utils.getImage(imageShortURL) : null;
			
  			if (image_url) {
  						template = '<div class="photoContainer">\n\
  											<img class="photo thumbnail" src="' + image_url + '" border=0 /> \n\
  											<div class="legend">\n\
  												<div class="photoTweet">\n\
  													<a href="http://twitter.com/' + element.author.username + '"><img class="thumbnail avatar" src="' + element.author.avatar + '" alt="' + element.author.username + '" border=0 width=32 /></a> \n\
  													<div class="content">\n\
  														<span class="text">' + element.description + '</span>\n\
  														<span class="timestamp">\n\
  															<a href="http://twitter.com/' + element.author.username + '"><span class="author">' + element.author.username + '</span></a>\n\
  															<img src="http://twitter.com/favicon.ico" width=16 border=0 class="sourceIcon" /><a href="' + element.permalink + '" target="_blank">' + Storify.utils.displayDate(element.created_at) + '</a>\n\
  														</span>\n\
  													</div> \n\
  												</div> \n\
  											</div>\n\
  											<img class="background" caption="' + element.metadata.user.profile_background_tile + '" title="' + element.metadata.user.profile_background_color + '" src="' + background_image + '" style="width:0;height:0;display:none;"/>\n\
  										</div>';
  			}

        layout += template + '</div>';
  			break;
  		default:
  		  return false;
		}

		return layout+'</div>';
	}

  function getTitle(author) {
    var title = $('<div>');
    var permalink = 'storify.com/<strong>' + author.username + '</strong>';    
    var avatar = $('<img class="avatar">').attr('src', author.avatar);
    var link = $('<a class="permalink">').attr('href', author.permalink).html(permalink);
    
    title.append(avatar, link);
    return title;
  }

  function init() {
		var storyurl = STORIFY_PERMALINK || 'http://storify.com/storify/testimonials';

		$.getJSON(storyurl + '.json?metadata=1&callback=?', function(data) {
		  $('#title').append(getTitle(data.author));
		  
			window.document.title = 'Slideshow: ' + data.title;
			
			if (previous_id != data.elements[0].permalink || previous_length != data.elements.length) {
				$("a.user").attr("href", "http://storify.com/" + data.author.username);
				$("a.user").text(data.author.username);
				$("#branding .userImage").remove();
				$("#branding h2").before("<img src=" + data.author.avatar + ' class="userImage" width="32" style="float: right;max-height:32px"/>');
				var fullHeight = $(window).height();
				var fullWidth = $(window).width();

				$.each(data.elements, function(index, element) {
					var html = getStoryElementHTML(element);
					if(html)
					  $("#twitterShow").append(html);
				});
				
			  $('.quote, .photoContainer, .textP').center();
			
				// Create the slideshow again using the new tweets, and fade it back in
				$("#twitterShow").cycle({
					fx: 'scrollHorz',
					timeout: 5000,
					speed: 300,
          nowrap: 1,
					before: onbefore,
					height: fullHeight,
					width: fullWidth,
					fit: 1
				});

			}
			$("#twitterShow").cycle("pause");
			
			previous_id = data.elements[0].permalink;
			previous_length = data.elements.length;
		});

  }
  
  init();
});