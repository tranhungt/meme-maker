MemeMaker.Routers.Photos = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },
  routes: {
    '': 'index',
    'photos/new': 'newPhoto',
    'photos/:id/memes/new': 'newMeme',
    'memes': 'memesIndex',
    'photos/:id/memes': 'photoMemes',
    'memes/:id': 'showMeme'

  },
  index: function(){
    var view = new MemeMaker.Views.PhotosIndex({collection: MemeMaker.photos});
    var renderedView = view.render();
    $rootEl.html(renderedView.$el)
  },

  memesIndex: function(){
    var view = new MemeMaker.Views.MemesIndex({collection: MemeMaker.memes})
    var renderedView = view.render();
    $rootEl.html(renderedView.$el)
  },

  showMeme: function(id){
    var meme = MemeMaker.memes.get(id);
    var view = new MemeMaker.Views.MemesShow({model: meme})
    var renderedView = view.render();
    $rootEl.html(renderedView.$el)
  }

});
