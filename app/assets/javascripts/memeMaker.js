window.MemeMaker = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(){
    $rootEl = $('#context');
    MemeMaker.photos = new MemeMaker.Collections.Photos();
    MemeMaker.memes = new MemeMaker.Collections.Memes();
    MemeMaker.memes.fetch();
    MemeMaker.photos.fetch({success: function(photos){
      MemeMaker.router = new MemeMaker.Routers.Photos({ $rootEl: $rootEl})
      Backbone.history.start();
    }});
    
  }
}

$(function(){
  window.MemeMaker.initialize()
})