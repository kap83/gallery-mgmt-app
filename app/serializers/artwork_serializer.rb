class ArtworkSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :title, :description, :paintings_url

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
