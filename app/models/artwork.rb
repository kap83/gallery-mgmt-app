class Artwork < ApplicationRecord
    belongs_to :artist
    belongs_to :exhibition, optional: true
    has_many_attached :paintings

end
