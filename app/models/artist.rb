class Artist < ApplicationRecord
    has_many :artworks, dependent: :destroy
    
    validates :name, :date_of_birth, presence: true
    validates_uniqueness_of :name, scope: [:date_of_birth], message: "Duplicate Artist Error"
  
    validate :birth_date_limitation

    def birth_date_limitation
        if date_of_birth <= Date.parse('1000-01-01')
            errors.add(:base, "this database currently only accepts birth years dating back to 1000 CE")
        end
    end


end
