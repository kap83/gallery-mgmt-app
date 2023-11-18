class RenameDescriptionToMedium < ActiveRecord::Migration[7.0]
  def change
    rename_column(:artworks, :description, :medium)
  end
end
