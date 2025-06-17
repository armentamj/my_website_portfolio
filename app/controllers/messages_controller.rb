class MessagesController < ApplicationController
  before_action :set_chat
  before_action :authenticate_user!

  def create
    @message = @chat.messages.build(message_params)
    @message.user = current_user
    @message.sent_at = Time.current

    if @message.save
      redirect_to @chat, notice: 'Message sent!'
    else
      render 'chats/show'
    end
  end

  def destroy
    @message = Message.find(params[:id])
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
end

