class CreateExhibitions < ActiveRecord::Migration[7.0]
  def change
    create_table :exhibitions do |t|
      t.string :title
      t.string :gallery
      t.date :start_date, default: '2023-01-01'
      t.date :end_date
      t.integer :user_id

      t.timestamps
    end
  end
end
