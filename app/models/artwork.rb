class Artwork < ApplicationRecord
    belongs_to :artist
    belongs_to :exhibition, optional: true
    has_many_attached :paintings

    validates :title, :medium, presence: true
    validate :check_if_painting_belong_to_an_exhibtion, on: :destroy

    # def check_if_painting_belong_to_an_exhibtion 
    #     if exhibition_id.present? 
    #         errors.add(:base, "Warning! #{self} is currently displayed in #{exhibition.title}. Do you wish to proceed? ") 
    #     end
    # end


end
