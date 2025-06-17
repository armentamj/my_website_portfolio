class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: 'User'
  has_many :messages, dependent: :destroy

  #does not allow for to conversations where it is beteen the same two users
  validate :no_duplicate_chat
  validate :not_self_chat

  private

  def no_duplicate_chat
    return if user_id.nil? || friend_id.nil?

    #look for a chat in either direction (user ↔ friend)
    if Chat.where(user_id: user_id, friend_id: friend_id).or(
         Chat.where(user_id: friend_id, friend_id: user_id)
       ).where.not(id: id).exists?
      errors.add(:base, "Chat between these users already exists")
    end
  end


  def not_self_chat
    if user_id == friend_id
      errors.add(:base, "You cannot chat with yourself.")
    end
  end
end

