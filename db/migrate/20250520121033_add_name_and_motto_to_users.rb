class AddNameAndMottoToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string
    add_column :users, :motto, :string
  end
end
