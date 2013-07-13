MemeMaker.Views.PhotosNew = Backbone.ModalView.extend({

  template: JST['photos/new'],
  events: {
    "change #photo_input": 'savePhoto'
  },
  render: function(){
    var template = this.template({})
    this.$el.html(template)
    return this
  },
  savePhoto: function(event){
    console.log(event.form);
    console.log($('#new_photo_form'));
    $('#new_photo_form').ajaxSubmit({
        beforeSubmit: function(arr,$form,options){
          console.log('beforesubmit')
          options.dataType = "json"
        },
        type: 'POST',
        url: '/photos',
        complete: function(XMLHttpRequest, textStatus){
          console.log('complete')
          console.log(XMLHttpRequest)
          console.log(textStatus)
          if(textStatus === "success"){
            console.log("success")
            photo = XMLHttpRequest.responseJSON;
            console.log(photo)
            console.log(MemeMaker.photos)
            MemeMaker.photos.push(photo);
            console.log(MemeMaker.photos)
            var photoTemplateFn = JST['photos/uploaded_photo'];
            var photoTemplate = photoTemplateFn({photo: photo});
            $('.grid').append(photoTemplate);
          }
        }
    })
  }
});
