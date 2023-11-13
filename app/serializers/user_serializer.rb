class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :avatar_url
  has_many :exhibitions

  def avatar_url
    if object.avatar.attached?
      variant = object.avatar.variant(resize_to_limit: [100, nil])
      return rails_representation_url(variant, only_path: true)
    end
  end
end
