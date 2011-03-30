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


function onYouTubePlayerAPIReady() {
 console.log("youtube player ready",YT.Player); 
}

$(document).ready(function() {


	var reloadCount = 0;

	var hash = window.location.hash;
	var permalink_token = hash.split("#")[1];

	$(".timeago").timeago();

	var previous_id = '';
	var previous_length = 0;

  slides = [];
  
  
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
	  
	  console.log("onbefore> calling: "+slides[opts.nextSlide].behavior,slides[opts.nextSlide]);
	  
	  if(slides[opts.nextSlide].behavior && slides[opts.nextSlide].behavior.onfocus) 
	    slides[opts.nextSlide].behavior.onfocus(slides[opts.nextSlide]);
	  
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

  function getSlideBehavior(slide) {
    console.log("getSlideBehavior> slide:",slide);
    switch (slide.element.elementClass) {
		case "video":
		  if(slide.element.source == "youtube") {
		    console.log("instantiating youtube video "+slide.element.metadata.id,$('#player-'+slide.element.metadata.id));
		    var controller = new YT.Player('player-'+slide.element.metadata.id, {
          height: document.height,
          width: document.width,
          videoId: slide.element.metadata.id,
          origin:'storify.com',
          playerVars: {
            origin:'http://storify.com'
          },
          events: {
            'onReady': function() {},
            'onStateChange': function() {}
          }
        });
        
		    slide.controller = controller;
		    
		    return {  onfocus: function(slide) {
		                slide.controller.playVideo();
	                },
	                onblur: function(slide) {
	                  slide.controller.stopVideo();
	                }
	              };
		    }
		break;
	  }
  };


	function getStoryElementHTML(element) {
	  
	  var layout = '<div class="slideWrapper '+element.elementClass+'Element">';
	  	  
		switch (element.elementClass) {
		case "video":
		  if(element.source == "youtube") {
        
        element.metadata.id = element.permalink.replace('http://www.youtube.com/watch?v=','');
        layout += '<iframe id="player-'+element.metadata.id+'" src="http://www.youtube.com/embed/'+element.metadata.id+'?enablejsapi=1&origin=example.com&controls=0&fs=1&hd=1" type="text/html" width="'+document.width+'" height="'+document.height+'" frameborder="0"></iframe>';
        	              
		  }
		  break;
		  
		case "text":
		  layout += '<p>'+element.description+'</p>';		  
		  break;
		case "photo":
			var imgUrl = element.metadata.url_o || element.metadata.url_m || element.metadata.url;
			layout += '<img class="photoSlide notResized" src="' + imgUrl + '" /><aside class="attribution" style="">' + element.metadata.title + '<br/>by: ' + element.author.name + '</aside>';
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
			var template = '<div class="tweet"><p>' + element.description + '</p><aside class="meta"><small class="timeago">' + Storify.utils.displayDate(element.metadata.created_at) + '</small></aside>\n\
							<aside class="user"><img alt="storify.com" src="http://www.extension.org/mediawiki/files/a/a7/Twitter_logo_header.png" width="144" height="33" class="twitterLogo" style="float: right;"/><img src="' + element.metadata.user.profile_image_url + '" width=48 /><div class="username"><a href="http://twitter.com/' + element.author.username + '">' + element.author.username + '</a></div><div class="name">' + element.metadata.user.name + '</div></aside></article><br style="clear:both;"/></section>\n\
							<img class="background" caption="' + element.metadata.user.profile_background_tile + '" title="' + element.metadata.user.profile_background_color + '" src="' + background_image + '" style="width:0;height:0;display:none;"/></div>';

			var urls, image_url;
			if (urls = Storify.utils.getUrls(element.title)) {
				for (var i = 0, len = urls.length; i < len; i++) {
					if (image_url = Storify.utils.getImage(urls[i])) {
						template = '	<div class="photoContainer">\n\
											<img class="photo thumbnail" src="' + image_url + '" border=0 /> \n\
											<div class="legend">\n\
												<div class="tweet">\n\
													<a href="http://twitter.com/' + element.author.username + '"><img class="thumbnail avatar" src="' + element.author.avatar + '" alt="' + element.author.username + '" border=0 width=32 /></a> \n\
													<div class="content">\n\
														<span class="text">' + element.title + '</span>\n\
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
				};
			}

			layout += template + '</div>';
			break;
			
		default:
		if(element.oembed && element.oembed.html) {
	    layout += element.oembed.html;
	  }
	  break;
		}

		return layout+'</div>';
	}


  var Slide = function(options) {
    this.element = options.element || null;
    this.behavior = options.behavior || {onfocus: function() {}, onblur: function() {}};
    this.html = options.html || null;    
  }


	function reloadData(timer) {

		var storyurl;
		if (window.location.hash && window.location.hash.match(/http:\/\/storify\.com\//)) storyurl = window.location.hash.substr(1);
		else storyurl = 'http://storify.com/nzherald/reaction-to-japanese-tsunami';

		$.getJSON(storyurl + '.json?metadata=1&callback=?', function(data) {
			//console.debug(data);
			//console.log(previous_length + " | " + data.elements.length);
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
						var slide = new Slide({
						  element: element,
						  html: getStoryElementHTML(element)
						});
						slide.node = $(slide.html);
						setTimeout(function() {
  						slide.behavior = getSlideBehavior(slide);
						},0);
						slides.push(slide);
						$("#twitterShow").append(slide.node);
					});
					
					console.log("Slides",slides);

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
