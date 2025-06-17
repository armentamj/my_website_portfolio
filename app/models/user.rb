class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  #chat associations
  has_many :chats                      #where user is 'user'
  has_many :inverse_chats, class_name: "Chat", foreign_key: "friend_id"  #where user is 'friend'
  has_many :messages                   #messages sent by the user

  has_one_attached :picture

  validates :name,
  presence: true,
  uniqueness: { case_sensitive: false },
  length: { maximum: 20 },
  format: {
    with: /\A[\p{L}\p{N}\p{P}\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\s\-']+\z/u,
    message: "can only contain letters, numbers, punctuation, and emojis"
  }


  validates :motto, presence: true
  validate :picture_content_type
  validate :picture_size
  validates :picture, presence: true, if: :picture_attached?

  #method for fetching all chats with user
  def all_chats
    Chat.where("user_id = ? OR friend_id = ?", id, id)
  end

  private

  def picture_content_type
    if picture.attached? && !picture.content_type.in?(%w(image/jpeg image/png image/gif))
      errors.add(:picture, 'must be a JPEG, PNG, or GIF image')
    end
  end

  def picture_size
    if picture.attached? && picture.byte_size > 5.megabytes
      errors.add(:picture, 'should be less than 5MB')
    end
  end

  def picture_attached?
    picture.attached?
  end
end


