class Artwork < ApplicationRecord
    belongs_to :artist
    belongs_to :exhibition
    has_many_attached :paintings

end
