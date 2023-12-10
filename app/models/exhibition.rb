class Exhibition < ApplicationRecord
    belongs_to :user
    has_many :artworks

    validates :title, :gallery, :start_date, :end_date, :user_id, presence: true
    validates :title, uniqueness: true
    #validates that a gallery is not in use during the specified dates 
    validates :start_date, :end_date, :overlap => {:scope => :gallery, :message_title => [:gallery], :message_content => "already in use during those dates" }
    validate :dates_cannot_be_in_the_past

    def dates_cannot_be_in_the_past
      if start_date && start_date < Date.today
        errors.add(:start_date, "can't be in the past")
      end
    
      if end_date && end_date < Date.today
        errors.add(:end_date, "can't be in the past")
      end
    end


    attr_reader :avatar_url
    attr_accessor :curator
end
