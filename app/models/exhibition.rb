class Exhibition < ApplicationRecord
    belongs_to :user
    has_many :artworks
    #accepts_nested_attributes_for :artworks

    validates :title, :gallery, :start_date, :end_date, :user_id, presence: true
    validates :title, uniqueness: true
    #validates :artworks, presence: true
    #validates :start_date, :end_date, :overlap => true

    attr_reader :avatar_url
    attr_accessor :curator
end
