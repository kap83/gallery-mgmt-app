class ExhibitionSerializer < ActiveModel::Serializer
  attributes :id, :title, :gallery, :start_date, :end_date, :curator

  def curator
    object.user.name.upcase
  end
  
end
