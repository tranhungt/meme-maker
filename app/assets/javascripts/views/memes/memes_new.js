
MemeMaker.Views.MemesNew = Backbone.ModalView.extend({
  template: JST['memes/new'],
  canvas_template: JST['memes/canvas'],
  top_text: '',
  bottom_text: '',
  width: 500,
  height: 400,

  render: function(){
    var template = this.template({photo: this.model, width: this.width, height: this.height})
    this.$el.html(template)
    return this
  },

  myCanvas: function(){
    var canvas = document.getElementById('viewport')
    return canvas;
  },

  myContext: function(){
    var context = this.myCanvas().getContext('2d')
    return context;
  },
  myImage: function(){
    var image = new Image();
    image.src = this.model.attributes.url
    return image;
  },

  clearCanvas: function(){
    this.myContext().clearRect(0,0,this.width,this.height)
    var image = this.myImage();
    this.myContext().drawImage(image,0,0, image.naturalWidth, image.naturalHeight)
  },
  events: {
    'keyup #meme_top_text': 'topText',
    'keyup #meme_bottom_text': 'bottomText',
    'click #save_meme': 'saveMeme'
  },

  topText: function(event){
    this.top_text = event.currentTarget.value.toUpperCase();
    this.draw();
  },

  bottomText: function(event){
    this.bottom_text = event.currentTarget.value.toUpperCase();
    this.draw();
  },

  draw: function(){
    var image = this.myImage();
    this.clearCanvas();
    var context = this.myContext()

    context.lineWidth = 1;
    context.fillStyle = "white";
    context.lineStyle = "black";
    context.textAlign = "center"
    context.font = "40px impact";
    context.strokeStyle= "black";
    context.lineWidth = 4;
    this.drawTop(context,image);
    this.drawBottom(context,image);
  },

  drawBottom: function(context, image){
    var context = context
    var image = image
    var lines = this.wrapText(context, this.bottom_text, image.naturalWidth * .9)
    lines = lines.reverse();
    _(lines).each(function(line, i){
      console.log(line)
      context.strokeText(line, image.naturalWidth / 2, image.naturalHeight - 10 - (40 + 1) * (i))
      context.fillText(line, image.naturalWidth / 2, image.naturalHeight - 10 - (40 + 1) * (i))
    })
  },

  drawTop: function(context, image){
    var context = context;
    var image = image;
    var lines = this.wrapText(context, this.top_text, image.naturalWidth * .9)
    _(lines).each(function(line, i){
      console.log(line)
      context.strokeText(line, image.naturalWidth / 2,  10+ (40 + 1) * (i + 1))
      context.fillText(line, image.naturalWidth / 2, 10+ (40 + 1) * (i + 1))
    })
  },
  saveMeme: function(){
    this.hideModal();
    console.log(this.bottom_text)
    if (this.bottom_text.length > 0|| this.top_text.length > 0  ){
      var dataURL = this.myCanvas().toDataURL();
      console.log(dataURL)
      $.ajax({
        url: '/memes',
        type: 'POST',
        data: {imageBase64: dataURL, photo_id: this.model.id},
        success: function(data){
          console.log(data)
          console.log(MemeMaker.memes)
          var newMeme = new MemeMaker.Models.Meme(data)
          MemeMaker.memes.add(newMeme)
          console.log(MemeMaker.memes)
          MemeMaker.router.navigate('#/memes/'+ newMeme.id, true)
        }
      })
    }
    // var newMeme = new MemeMaker.Models.Meme();
    // MemeMaker.photos.push(new MemeMaker.Models.)
  },

  wrapText: function(ctx, text, maxWidth){
    var words = text.split(' ');
    if (ctx.measureText(text).width < maxWidth ){
      return [text];
    }
    console.log(words)
    var lines = [];
    while (words.length > 0) {
      var line = '';
      var packed = false;
      var maxChars = parseInt(maxWidth / ctx.measureText('a').width)
      console.log(maxChars)
      if(ctx.measureText(words[0]).width > maxWidth){
        console.log('big ass word')
        var word = words[0];
        var tempWord = word.slice(0, maxChars )
        line = tempWord
        words[0] = word.slice(maxChars)
        packed = true;
      }
      else{
        line = words.shift();
      }

      while (packed === false && words.length > 0){
        if (ctx.measureText(line + ' ' + words[0]).width <= maxWidth){
          // if(words[0] == undefined){
            // words.shift();
          // } 
          // else{
            line = line + ' ' + words.shift();
          // }
        }
        else{
          packed = true;
        }
      }

      console.log('else')
      console.log(line)
      lines.push(line);
      console.log(line)
    }
    console.log(lines)
    return lines;
  }


})