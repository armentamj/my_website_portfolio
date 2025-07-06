class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  enum status: { sent: 0, delivered: 1, read: 2 }

  before_validation :sanitize_body
  before_create :set_default_status

  validates :body,
    presence: true,
    length: { maximum: 1000 },
    format: {
      with: /\A[\p{L}\p{N}\p{P}\p{S}\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\s]+\z/u,
      message: "contains invalid characters"
  }

  after_create_commit do
    broadcast_append_to(
      "chat_#{chat.id}_messages",
      target: "messages",
      partial: "messages/message",
      locals: { message: self, current_user: user }
    )
  end

  after_update_commit :broadcast_status_update

  private

  def sanitize_body
    return if body.blank?

    self.body = body.strip.gsub(
      /[^\p{L}\p{N}\p{P}\p{S}\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\s]/u,
      ''
    )
  end

  def set_default_status
    self.status ||= :sent
  end

  def broadcast_status_update
    # Broadcast a replace for this message so status updates reflect in UI
    broadcast_replace_to(
      "chat_#{chat.id}_messages",
      target: "message_#{id}",
      partial: "messages/message",
      locals: { message: self, current_user: user }
    )
  end
end
