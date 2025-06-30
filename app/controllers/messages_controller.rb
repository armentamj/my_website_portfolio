class MessagesController < ApplicationController
  before_action :set_chat
  before_action :authenticate_user!

  def create
    @message = @chat.messages.build(message_params)
    @message.user = current_user
    @message.sent_at = Time.current

    if @message.save
      respond_to do |format|
        format.turbo_stream
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
end
