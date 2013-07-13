class Photo < ActiveRecord::Base
  attr_accessible :image
  has_attached_file :image, :styles => {:normal => '500x500>', :thumb => '250x250>'}
  validates :image, :presence => true
  def url
    image.url(:normal)
  end

  def thumb
    image.url(:thumb)
  end

  def serializable_hash(options = {})
    super(options.merge({:methods => [:url, :thumb]} ))
  end
  # def to_json(options = {})
  #   super(options.merge({url: url}))
  # end
end
