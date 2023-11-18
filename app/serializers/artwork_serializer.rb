class ArtworkSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :title, :medium, :paintings_url, :artist_id

  def paintings_url
    if object.paintings.attached?
      object.paintings.map do |painting|
        rails_blob_path(painting, only_path: true)
      end
    else
      []
    end
  end
end
