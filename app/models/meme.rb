class Meme < ActiveRecord::Base
  attr_accessible :bottom_text, :photo_id, :top_text, :image
  has_attached_file :image, :styles => {:normal => '350x350>', :thumb => '200x200>'}

  def url
    image.url
  end

  def thumb
    image.url(:thumb)
  end

  def serializable_hash(options = {})
    super(options.merge({:methods => [:url, :thumb]} ))
  end
end
