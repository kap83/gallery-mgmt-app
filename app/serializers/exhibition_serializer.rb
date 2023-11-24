class ExhibitionSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  has_many :artworks

  attributes :id, :title, :gallery, :start_date, :end_date, :curator, 
  :avatar_url

  def curator
    object.user.name.upcase
  end
  

  def avatar_url
    if object.user.avatar.attached?
      variant = object.user.avatar.variant(
        resize_to_limit: [100, nil], 
        crop: [0, 0, 100, 100]
      )
      return rails_representation_url(variant, only_path: true)
    end
  end
 
end
