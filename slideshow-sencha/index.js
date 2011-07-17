;(function() {
  
  Slideshow = function() {

  var self = this,
      slides = [],
      container = $('#elements'),
      currentSlide=0,
      totalSlides=0,
      storify = new Storify(),
      storyPermalink = storify.getPermalink() || 'http://storify.com/storify/testimonials';

  //story = {"permalink":"http://storify.com/xdamman/iosdevcamp","published_at":1310784583,"author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"},"editors":null,"shorturl":"http://sfy.co/DDe","title":"#iOSDevCamp - win 2 iPads 2 for the best app using Storify's API","description":"","thumbnail":"http://yfrog.com/kh9rnxwj:iphone","topics":["#iosdevcamp"],"elements":{"0":{"editor":{"username":"xdamman"},"source":"storify","elementClass":"text","permalink":"http://storify.com/xdamman/iosdevcamp/elements/text/1039","title":"","description":"<div>Storify is a proud sponsor of #iOSDevCamp.</div>","favicon":"http://g.etfv.co//elements/text/1039","created_at":"1310784356","added_at":"1310784356","author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"}},"1":{"editor":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"},"source":"twitter","image":{"src":"http://yfrog.com/kh9rnxwj:iphone","href":"http://yfrog.com/kh9rnxwj","host":"yfrog"},"elementClass":"tweet","permalink":"http://twitter.com/ravenme/status/92058844016033792#231","title":"#iOSDevCamp Sponsors. You are all awesome!  http://yfrog.com/kh9rnxwj","description":"#iOSDevCamp Sponsors. You are all awesome!  http://yfrog.com/kh9rnxwj","thumbnail":"http://yfrog.com/kh9rnxwj:iphone","favicon":"http://g.etfv.co/http://twitter.com/ravenme/status/92058844016033792","author":{"username":"ravenme","avatar":"http://a2.twimg.com/profile_images/1098135341/image_normal.jpg","href":"http://twitter.com/ravenme","name":"ravenme"},"created_at":"1310783513","added_at":"1310784318"},"2":{"editor":{"username":"xdamman"},"source":"storify","elementClass":"text","permalink":"http://storify.com/xdamman/iosdevcamp/elements/text/6743","title":"","description":"<p>We are offering 2 iPads 2 for the best iOS or HTML5 app using <a href=\"http://dev.storify.com\">our APIs</a>.</p>","favicon":"http://g.etfv.co//elements/text/6743","created_at":"1310784374","added_at":"1310784374","author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"}},"3":{"editor":"xdamman","source":"SlideShare","image":{"src":"http://cdn.slidesharecdn.com/storify-iosdevcamp-110715200039-phpapp01-thumbnail-2","width":"400","height":"334","href":"http://www.slideshare.net/xdamman/storify-iosdevcamp"},"elementClass":"website","permalink":"http://www.slideshare.net/xdamman/storify-iosdevcamp","title":"Storify #iOSDevCamp","description":"Flash Player 9 (or above) is needed to view presentations. We have detected that you do not have it on your computer. To install it, go here. 0 views, 0 favs, 0 embeds","thumbnail":"http://cdn.slidesharecdn.com/storify-iosdevcamp-110715200039-phpapp01-thumbnail-2","favicon":"http://www.slideshare.net/favicon.ico","author":{"name":"slideshare.net","href":"http://www.slideshare.net/xdamman/storify-iosdevcamp","username":"slideshare.net"},"created_at":"1310778641","added_at":"1310778641","oembed":{"provider_url":"http://www.slideshare.net","description":"Flash Player 9 (or above) is needed to view presentations. We have detected that you do not have it on your computer. To install it, go here. 0 views, 0 favs, 0 embeds","title":"Storify #iOSDevCamp","author_name":"Xavier Damman","height":"334","width":"400","html":"<iframe src=\"http://www.slideshare.net/slideshow/embed_code/8609530\" width=\"400\" height=\"334\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\"></iframe>","thumbnail_width":"120","provider_name":"SlideShare","thumbnail_url":"http://cdn.slidesharecdn.com/storify-iosdevcamp-110715200039-phpapp01-thumbnail-2","type":"rich","thumbnail_height":"90","author_url":"http://www.slideshare.net/xdamman"}},"4":{"editor":{"username":"xdamman"},"source":"storify","elementClass":"text","permalink":"http://storify.com/xdamman/iosdevcamp/elements/text/2828","title":"","description":"<p>You can find more information on our APIs on http://dev.storify.com - if you have any questions you can ping us on twitter <a href=\"http://twitter.com/storifydev\">@storifydev&nbsp;</a></p>","favicon":"http://g.etfv.co//elements/text/2828","created_at":"1310778713","added_at":"1310778713","author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"}},"5":{"editor":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"},"source":"twitter","image":{"src":"http://yfrog.com/kg6gkvj:iphone","href":"http://yfrog.com/kg6gkvj","host":"yfrog"},"elementClass":"tweet","permalink":"http://twitter.com/ravenme/status/92023162635689985","title":"Door open! #iOSDevCamp  http://yfrog.com/kg6gkvj","description":"Door open! #iOSDevCamp  http://yfrog.com/kg6gkvj","thumbnail":"http://yfrog.com/kg6gkvj:iphone","favicon":"http://g.etfv.co/http://twitter.com/ravenme/status/92023162635689985","author":{"username":"ravenme","avatar":"http://a2.twimg.com/profile_images/1098135341/image_normal.jpg","href":"http://twitter.com/ravenme","name":"ravenme"},"created_at":"1310775006","added_at":"1310778365"},"6":{"editor":{"username":"xdamman"},"source":"storify","elementClass":"text","permalink":"http://storify.com/xdamman/iosdevcamp/elements/text/7900","title":"","description":"<p>This year it will be my 3rd participation to #iOSDevCamp. It's a great event and I'm excited to be here.&nbsp;</p><p></p>","favicon":"http://g.etfv.co//elements/text/7900","created_at":"1310778643","added_at":"1310778643","author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"}},"7":{"editor":{"username":"xdamman"},"source":"storify","elementClass":"text","permalink":"http://storify.com/xdamman/iosdevcamp/elements/text/6435","title":"","description":"<p>Other companies are also sponsoring the event and especially PayPal who is hosting. Thanks to them!</p>","favicon":"http://g.etfv.co//elements/text/6435","created_at":"1310778758","added_at":"1310778758","author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"}},"8":{"editor":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"},"source":"twitter","elementClass":"tweet","permalink":"http://twitter.com/inmobi/status/92025827956506625","title":"#iOSDevCamp Devs stop by our table if you're interested in being a beta tester of new exciting InMobi tech.","description":"#iOSDevCamp Devs stop by our table if you're interested in being a beta tester of new exciting InMobi tech.","thumbnail":"http://a2.twimg.com/profile_images/1100166923/Twitter_Icon_normal.png","favicon":"http://g.etfv.co/http://twitter.com/inmobi/status/92025827956506625","author":{"username":"inmobi","avatar":"http://a2.twimg.com/profile_images/1100166923/Twitter_Icon_normal.png","href":"http://twitter.com/inmobi","name":"inmobi"},"created_at":"1310775641","added_at":"1310778343"},"9":{"editor":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"},"source":"twitter","elementClass":"tweet","permalink":"http://twitter.com/PayPalx/status/92034263888822272","title":"RT @srimudigere: I'll be speaking at #iOSDevCamp 2011 @paypalx on our New  Invoicing APIs this weekend. Join me Sat @ 4:00pm http://t.co/2kSAh4M","description":"RT @srimudigere: I'll be speaking at #iOSDevCamp 2011 @paypalx on our New  Invoicing APIs this weekend. Join me Sat @ 4:00pm http://t.co/2kSAh4M","favicon":"http://g.etfv.co/http://twitter.com/PayPalx/status/92034263888822272","author":{"username":"PayPalx","avatar":"http://a3.twimg.com/profile_images/328574854/PayPal_x_logo-square_normal.JPG","href":"http://twitter.com/PayPalx","name":"PayPalx"},"created_at":"1310777653","added_at":"1310778271"},"10":{"editor":{"username":"xdamman"},"source":"storify","elementClass":"text","permalink":"http://storify.com/xdamman/iosdevcamp/elements/text/1695","title":"","description":"And thanks of course to the organizers. They are putting a lot of energy into this.","favicon":"http://g.etfv.co//elements/text/1695","created_at":"1310784465","added_at":"1310784465","author":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"}},"11":{"editor":{"username":"xdamman","name":"Xavier Damman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","description":"Passionate web entrepreneur/developer with values and ideals. Cofounder of @storify. \r\nFounder of @HackDemocracy.","location":"San Francisco","website":"http://xavierdamman.be","permalink":"http://storify.com/xdamman"},"source":"twitter","elementClass":"tweet","permalink":"http://twitter.com/xdamman/status/92061073980665856","title":"@ravenme you are even more awesome. Putting together such event is a ton of work. You guys rock.","description":"@ravenme you are even more awesome. Putting together such event is a ton of work. You guys rock.","thumbnail":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","favicon":"http://g.etfv.co/http://twitter.com/xdamman/status/92061073980665856","author":{"username":"xdamman","avatar":"http://a3.twimg.com/profile_images/1277335507/avatar_xdamman_normal.png","href":"http://twitter.com/xdamman","name":"xdamman"},"created_at":"1310784045","added_at":"1310784454"}}};

  var templates = {
    text: "{{text}}",

    tweet: '<div class="body"><p>{{description}}</p></div> \
            <div class="footer">\
              <div class="author"> \
                <img src="{{author.avatar}}"> \
                <div class="name">{{author.name}}</div>\
                <div class="username">@{{author.username}}</div>\
              </div>\
              <div class="metadata">\
                <div class="timestamp">{{created_at}}</div>\
                <div class="actions"></div>\
              </div>\
            </div>'
  }

  this.init = function(callback) {

    storify.loadStory(storyPermalink, function(story) {

      for(var i in story.elements) {
        totalSlides++;
        var element = story.elements[i], elementNode;

        elementNode = $('<div>')
                        .addClass("storyElement")
                        .addClass(element.elementClass)
                        .attr("permalink",element.permalink);

        switch(element.elementClass) {
          case "text":
          elementNode.html(element.description);
          slides.push({title: 'Slide '+totalSlides, html:elementNode.html(), cls:'storyElement '+element.elementClass });
          break;

          case "tweet":
          elementNode.html(renderTemplate(templates.tweet,element));
          slides.push({title: 'Slide '+totalSlides, html:elementNode.html(), cls:'storyElement '+element.elementClass });
          break;
        }

      }

      console.log("story loaded",story);
      console.log('slides:',slides);
      if(typeof callback=='function') callback();
      
    });

  }
  
  this.getSlides = function() {
    return slides;
  }
  
  function renderTemplate(template, data) {
    return template.replace(/{{([a-z\._]{1,50})}}/ig,function() {

      var value = data;

      var tokens = arguments[1].split('.');
      for (var i=0, len=tokens.length; i < len; i++) {
        value = value[tokens[i]];
        if(tokens[i]=='created_at') value = displayDate(value,true);
      };

      if(typeof value != 'string') return '';

      return value;
    });
  }

  function displayDate(date, relative, showTime) {
    if (typeof showTime == 'undefined') var showTime = true;

    if(typeof date == 'undefined' || date == 'NaN' || isNaN(date))
      return '';

    var date = ''+date;

    if(parseInt(date,10) > 0) {
      if(date.length==10) {
        date = parseInt(date,10)*1000;
      }
    } else {
      // Date string are not as flexible on Webkit than Gecko...
      if(date.substr(10,1)=='T') {
        if(date.substr(date.length-1,1)=='Z') {
          date = Date.UTC(parseInt(date.substr(0,4),10),parseInt(date.substr(5,2),10)-1,parseInt(date.substr(8,2),10),parseInt(date.substr(11,2),10),parseInt(date.substr(14,2),10),parseInt(date.substr(17,2),10));
        } else {
          date = (date.substr(16,1)==':') ? date.substr(0,19) : date.substr(0,16);
          date = date.replace('T',' ').replace(/\-/g,'/');
        }
      }
    }

    var j=new Date();
    var f=new Date(date);

    //if(B.ie) { f = Date.parse(h.replace(/( \+)/," UTC$1")) }

    if(relative) {
      var i=j-f;
      var c=1000,d=c*60,e=d*60,g=e*24,b=g*7;

      if(isNaN(i)||i<0){return"";}
      if(i<c*7){return"right now";}
      if(i<d){return Math.floor(i/c)+" seconds ago";}
      if(i<d*2){return"about 1 minute ago";}
      if(i<e){return Math.floor(i/d)+" minutes ago";}
      if(i<e*2){return"about 1 hour ago";}
      if(i<g){return Math.floor(i/e)+" hours ago";}
      //if(i>g&&i<g*2){return"yesterday"}
      //if(i<g*365){return Math.floor(i/g)+" days ago"}
    }
  }

}

})();


slideshow = new Slideshow();
slideshow.init(function() {
  
  slides = slideshow.getSlides();

  Ext.setup({
      tabletStartupScreen: 'tablet_startup.png',
      phoneStartupScreen: 'phone_startup.png',
      icon: 'icon.png',
      glossOnIcon: false,
      onReady: function() {

          var carousel1 = new Ext.Carousel({
              defaults: {
                  cls: 'card'
              },
              items: slides
          });

          var panel = new Ext.Panel({
              fullscreen: true,
              layout: 'fit',
              items: [carousel1]
          });

          valignElements();
      }
  });
  
});



function valignElements() {
  $('.storyElement').each(function() {
    //var nodeHeight = $(this).find('.x-panel-body').height();
    //console.log(' height: '+nodeHeight);
    //$(this).css('top',Math.max(Math.round((window.innerHeight-100)/2-nodeHeight),20));
    $(this).css('top',Math.max(Math.round((window.innerHeight-300)/2),20));
    
  });
  
}

/*
var panel = new Ext.Panel({
    fullscreen: true,
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Previous',
            handler: function(){
                carousel1.prev();
            }
        },{
            text: 'Next',
            handler: function(){
                carousel1.next();
            }
        }]
    }],
    items: [carousel1]
});
*/
