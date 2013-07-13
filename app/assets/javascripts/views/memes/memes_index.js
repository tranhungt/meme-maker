MemeMaker.Views.MemesIndex = Backbone.View.extend({

  template: JST['memes/index'],
  render: function(){
    console.log(this.collection)
    var template = this.template({memes: this.collection});
    this.$el.html(template);
    return this;
  }

});
