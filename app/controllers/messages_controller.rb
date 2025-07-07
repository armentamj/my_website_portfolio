class MessagesController < ApplicationController
  before_action :set_chat
  before_action :authenticate_user!

  def create
    @message = @chat.messages.build(message_params)
    @message.user = current_user
    @message.sent_at = Time.current

    if @message.save
      # Broadcast the new message manually (ActionCable or Turbo Streams)
      broadcast_message(@message, current_user)

      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.append(
            "messages",
            partial: "messages/message",
            locals: { message: @message, current_user: current_user }
          )
        end
        format.html { redirect_to @chat, notice: 'Message sent!' }
      end
    else
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "new_message",
            partial: "messages/form",
            locals: { chat: @chat, message: @message }
          )
        end
        format.html { render 'chats/show', status: :unprocessable_entity }
      end
    end
  end

  def mark_read
    @message = Message.find(params[:id])

    if @message.user_id != current_user.id && @message.status != 'read'
      @message.update(status: :read)

      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            dom_id(@message),
            partial: "messages/message",
            locals: { message: @message, current_user: current_user }
          )
        end
        format.html { head :ok }
      end
    else
      head :ok
    end
  end

  def destroy
    @message = @chat.messages.find(params[:id])
    @message.destroy
    redirect_to @chat, notice: 'Message deleted.'
  end

  private

  def set_chat
    @chat = Chat.find(params[:chat_id])
  end

  def message_params
    params.require(:message).permit(:body, :status)
  end

  def broadcast_message(message, current_user)
    # You can either broadcast using ActionCable or Turbo Streams here.
    # Here is a simple Turbo Streams broadcast using Rails built-in broadcasting:

    # For example, if you have a Turbo Stream subscription on "chat_#{chat_id}_messages":
    Turbo::StreamsChannel.broadcast_append_to(
      "chat_#{message.chat_id}_messages",
      target: "messages",
      partial: "messages/message",
      locals: { message: message, current_user: current_user }
    )
  end
end
