function Storify() {}

Storify.prototype = {
  getPermalink: function() {
    var permalink = null;
    
    if (window.location.hash.match(/http\:\/\/.*storify\.com/)) {
      permalink = window.location.hash.substr(1);
    }
    
    return permalink;
  }
  
};