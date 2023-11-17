class AddArtistIdToArtwork < ActiveRecord::Migration[7.0]
  def change
    add_column :artworks, :artist_id, :integer
  end
end
