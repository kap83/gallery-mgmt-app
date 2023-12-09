class Artist < ApplicationRecord
    has_many :artworks, dependent: :destroy
    
    validates :name, :date_of_birth, presence: true


end
