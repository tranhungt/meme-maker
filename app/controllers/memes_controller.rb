require 'cgi'
require 'base64'
class MemesController < ApplicationController
  def index
    @memes = Meme.all
    render json: @memes
  end

  def create
    image = decode64_url(params[:imageBase64])
    meme = Meme.new(:image => image, :photo_id => params[:photo_id])
    if meme.save
      render json: meme
    else
      render json: {}
    end
  end
  def decode64_url(str)
    str = str.split(',')[1]
    StringIO.new(Base64.decode64(str))    
  end
end
