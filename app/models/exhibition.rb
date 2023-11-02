class Exhibition < ApplicationRecord
    belongs_to :user

    validates :title, :gallery, :start_date, :end_date, :user_id, presence: true
    validates :title, uniqueness: true
    #validates :start_date, :end_date, :overlap => true
end
