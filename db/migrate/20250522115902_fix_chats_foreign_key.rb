class FixChatsForeignKey < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :chats, :friends
    add_foreign_key :chats, :users, column: :friend_id
  end
end
