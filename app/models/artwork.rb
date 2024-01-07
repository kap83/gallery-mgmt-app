class Artwork < ApplicationRecord
    belongs_to :artist
    belongs_to :exhibition, optional: true
    has_many_attached :paintings

    validates :title, :medium, presence: true
    validate :check_if_painting_belong_to_an_exhibtion, on: :destroy



end
