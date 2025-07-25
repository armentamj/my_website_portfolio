class ChatsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_chat, only: [:show, :destroy]

  def index
    # Fetching the chats where the current user is either the user or the friend
    @chats = Chat.where(user_id: current_user.id).or(Chat.where(friend_id: current_user.id))
    @users = []
  end

  def show
    @other_person = @chat.user == current_user ? @chat.friend : @chat.user

    # Mark incoming messages as delivered and broadcast updates
    incoming_messages = @chat.messages.where.not(user_id: current_user.id).where(status: :sent)
    if incoming_messages.any?
      incoming_messages.update_all(status: :delivered)
      incoming_messages.each do |message|
        Turbo::StreamsChannel.broadcast_replace_to(
          "chat_#{@chat.id}_messages",
          target: "message_#{message.id}",
          partial: "messages/message",
          locals: { message: message, current_user: current_user }
        )
      end
    end

    @messages = @chat.messages.includes(:user).order(Arel.sql("COALESCE(sent_at, created_at) ASC"))
    @message = Message.new
  end

  def new
    @chat = Chat.new
  end

  def create
    @chat = Chat.new(chat_params)

    if @chat.save
      redirect_to @chat, notice: 'Chat was successfully created.'
    else
      render :new
    end
  end

  def destroy
    @chat.destroy
    redirect_to chats_url, notice: 'Chat was successfully deleted.'
  end

  def search
    query = params[:query].to_s.strip

    if query.blank?
      respond_to do |format|
        format.turbo_stream { render partial: "chats/empty_search_message" }
        format.html { render partial: "chats/empty_search_message" }
      end
      return
    end

    if query.length > 20
      respond_to do |format|
        format.turbo_stream { render partial: "chats/query_too_long_message" }
        format.html { render partial: "chats/query_too_long_message" }
      end
      return
    end

    emoji_regex = /[^\p{L}\p{N}\p{P}\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\s\-']+/u
    sanitized_query = query.gsub(emoji_regex, '')

    @users = User.where("LOWER(name) LIKE ?", "%#{sanitized_query.downcase}%")
                .where.not(id: current_user.id)

    respond_to do |format|
      format.turbo_stream { render partial: "chats/search_results", locals: { users: @users } }
      format.html { render partial: "chats/search_results", locals: { users: @users } }
    end
  end

  private

  def set_chat
    @chat = Chat.find_by(id: params[:id])
    unless @chat && (@chat.user == current_user || @chat.friend == current_user)
      redirect_to chats_path, alert: "Chat not found or you don't have permission to view it."
      return
    end
  end

  def chat_params
    params.require(:chat).permit(:user_id, :friend_id)
  end
end