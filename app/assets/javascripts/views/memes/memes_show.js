MemeMaker.Views.MemesShow = Backbone.View.extend({
  template: JST['memes/show'],
  render: function(){
    var template = this.template({meme: this.model});
    this.$el.html(template);
    return this;
  }
})