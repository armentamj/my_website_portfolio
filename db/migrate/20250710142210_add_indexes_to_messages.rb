class AddIndexesToMessages < ActiveRecord::Migration[7.0]
  def change
    add_index :messages, [:chat_id, :sent_at]
    add_index :messages, [:chat_id, :created_at]
    add_index :messages, [:user_id, :status]
  end
end
