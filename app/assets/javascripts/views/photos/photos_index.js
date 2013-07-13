MemeMaker.Views.PhotosIndex = Backbone.View.extend({

  template: JST['photos/index'],
  render: function(){
    var template = this.template({photos: this.collection})
    this.$el.html(template)
    return this
  },
  events: {
    "click #new_photo_link": 'newPhoto',
    "click #new_meme_form": 'newMeme'
  },
  newPhoto: function(){
    var view = new MemeMaker.Views.PhotosNew();
    var renderedView = view.render();

    $rootEl.append(renderedView.$el);
  },

  newMeme: function(event){
    event.preventDefault();
    photoID = $(event.currentTarget).attr('data-id')
    // photo = MemeMaker.photos.get(1)
    var photo = MemeMaker.photos.get(parseInt(photoID));
    var view = new MemeMaker.Views.MemesNew({model: photo})
    var renderedView = view.render().showModal();
    // $rootEl.html(renderedView.$el);
  },

});
