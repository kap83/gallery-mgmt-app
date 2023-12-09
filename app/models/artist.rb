class Artist < ApplicationRecord
    has_many :artworks, dependent: :destroy
    
    validates :name, :date_of_birth, presence: true
    validates_uniqueness_of :name, scope: [:date_of_birth], message: "Duplicate Artist Error"

end
