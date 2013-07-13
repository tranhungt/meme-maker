class PhotosController < ApplicationController
  def index
    @photos = Photo.all
    render json: @photos
  end

  def create
    @photo = Photo.new(params[:photo])
    if @photo.save
      render json: @photo
    else
      render json: {}
    end
  end

end
