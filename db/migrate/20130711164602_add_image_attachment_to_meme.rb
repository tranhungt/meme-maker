class AddImageAttachmentToMeme < ActiveRecord::Migration
  def change
    add_attachment :memes, :image
  end
end
