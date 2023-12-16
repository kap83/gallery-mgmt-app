class AddExhibitionIdToArtwork < ActiveRecord::Migration[7.0]
  def change
    add_column :artworks, :exhibition_id, :integer
    add_foreign_key :artworks, :exhibitions, column: :exhibition_id, on_delete: :nullify
  end
end
