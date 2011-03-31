var timer = window.setInterval(function() {
	//console.log("reloading data");
	reloadData(this);
},
2500);



function getUrlVars() {
	var vars = [],
		hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

var params = getUrlVars();

$(document).ready(function() {

	function setTimer(action) {
		if (action == true) {
			window.clearInterval(timer);
			//console.log("starting timer");
			timer = window.setInterval(function() {
				//console.log("reloading data");
				reloadData(this);
			},
			2500);
		} else {
			//console.log("stoping timer");
			window.clearInterval(timer);
		}
	}



	function onafter(curr, next, opts) {
		//console.log("Current slide: "+opts.currSlide);
		if (opts.currSlide != 0) {
			setTimer(false);
		} else {
			setTimer(true);
		}
	}



	function onbefore(curr, next, opts) {
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



	function checkKey(e, timer) {
		switch (e.keyCode) {
		case 37:
			// Left
			setTimer(false);
			$("#twitterShow").cycle("prev");
			break;
		case 39:
			// Right
			setTimer(false);
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
		$(document).keypress(checkKey, timer);
	} else {
		$(document).keydown(checkKey, timer);
	}

	$("#twitterShow").touchwipe({
		wipeLeft: function() {
			$("#twitterShow").cycle("next");
		},
		wipeRight: function() {
			$("#twitterShow").cycle("prev");
		}
	});

	var reloadCount = 0;

	var hash = window.location.hash;
	var permalink_token = hash.split("#")[1];

	$(".timeago").timeago();

	var previous_id = '';
	var previous_length = 0;



	function getStoryElementHTML(element) {
	  
	  var layout = '<div class="slideWrapper '+element.elementClass+'Element">';
	  
	  console.log("getStoryElementHTML> element ",element);
	  
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
		  
		case "text":
		  layout += '<p>'+element.description+'</p>';		  
		  break;
		case "photo":
			var imgUrl = element.metadata.url_o || element.metadata.url_m || element.metadata.url;
			layout += '<img class="photoSlide notResized" src="' + imgUrl + '" /><aside class="attribution">' + element.metadata.title + '<br/>by: ' + element.author.name + '</aside>';
			break;
		case "tweet":
		  var background_image;
			if (element.metadata.user.profile_background_image_url) {
				background_image = element.metadata.user.profile_background_image_url;
			} else {
				background_image = "none";
			}
			element.metadata.user.name = element.metadata.user.name || '';
			layout += '<section class="twitterSlide"><article>';
			var topPosition = Math.round((document.height - 500) / 2);
			var template = '<div class="tweet" style="position:relative;top:'+topPosition+'px;"><p>' + element.description + '</p><aside class="meta"><small class="timeago">' + Storify.utils.displayDate(element.metadata.created_at) + '</small></aside>\n\
							<aside class="user"><img alt="storify.com" src="http://www.extension.org/mediawiki/files/a/a7/Twitter_logo_header.png" width="144" height="33" class="twitterLogo" style="float: right;"/><img src="' + element.metadata.user.profile_image_url + '" width=48 /><div class="username"><a href="http://twitter.com/' + element.author.username + '">' + element.author.username + '</a></div><div class="name">' + element.metadata.user.name + '</div></aside></article><br style="clear:both;"/></section>\n\
							<img class="background" caption="' + element.metadata.user.profile_background_tile + '" title="' + element.metadata.user.profile_background_color + '" src="' + background_image + '" style="width:0;height:0;display:none;"/></div>';

			var urls, image_url;
			
			var imageShortURL = Storify.utils.parseFirstURL(element.description);
			var image_url = Storify.utils.getImage(imageShortURL);
			if (image_url) {
						template = '	<div class="photoContainer" style="position:relative;top:'+topPosition+'px;">\n\
											<img class="photo thumbnail" src="' + image_url + '" border=0 /> \n\
											<div class="legend">\n\
												<div class="tweet">\n\
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
		//if(element.oembed && element.oembed.html) {
	  //  layout += element.oembed.html;
	  //}
	  break;
		}

		return layout+'</div>';
	}



	function reloadData(timer) {

		var storyurl;
		if (window.location.hash && window.location.hash.match(/http:\/\/storify\.com\//)) storyurl = window.location.hash.substr(1);
		else storyurl = (typeof STORIFY_PERMALINK != 'undefined') ? STORIFY_PERMALINK : 'http://storify.com/nzherald/reaction-to-japanese-tsunami';

		$.getJSON(storyurl + '.json?metadata=1&callback=?', function(data) {
			//console.debug(data);
			//console.log(previous_length + " | " + data.elements.length);
			
			window.document.title = 'Slideshow: ' + data.title;
			
			if (previous_id != data.elements[0].permalink || previous_length != data.elements.length) {
				$("a.user").attr("href", "http://storify.com/" + data.author.username);
				$("a.user").text(data.author.username);
				$("#branding .userImage").remove();
				$("#branding h2").before("<img src=" + data.author.avatar + ' class="userImage" width="32" style="float: right;max-height:32px"/>');
				var fullHeight = $(window).height();
				var fullWidth = $(window).width();
				$("#twitterShow").fadeOut('slow', function() {
					// Animation complete.
					$("#twitterShow").empty();
					reloadCount++;

					$.each(data.elements, function(index, element) {
						var html = getStoryElementHTML(element);
						if(html)
						  $("#twitterShow").append(html);
					});

					// Create the slideshow again using the new tweets, and fade it back in
					$("#twitterShow").cycle({
						fx: 'scrollHorz',
						timeout: 5000,
						speed: 400,
						//nowrap:			1,
						after: onafter,
						before: onbefore,
						height: fullHeight,
						width: fullWidth,
						fit: 1
					}).fadeIn('slow');
				});
			}
			$("#twitterShow").cycle("pause");
			previous_id = data.elements[0].permalink;
			previous_length = data.elements.length;
		});
	}

	reloadData();
	$('#help').fadeIn(10).delay(4000).fadeOut('fast');

});