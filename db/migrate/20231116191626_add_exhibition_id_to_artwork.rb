class AddExhibitionIdToArtwork < ActiveRecord::Migration[7.0]
  def change
    add_column :artworks, :exhibition_id, :integer
  end
end
