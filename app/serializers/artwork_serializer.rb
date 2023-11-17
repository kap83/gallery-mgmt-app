class ArtworkSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :title, :description, :painting_url, artist_id

  def painting_url
    if object.paintings.attached?
     rails_blob_path(object.paintings, only_path: true)
    end

  end
  

end
