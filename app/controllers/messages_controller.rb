class MessagesController < ApplicationController
  before_action :set_chat
  before_action :authenticate_user!
  before_action :set_message, only: [:mark_read, :destroy]

  def create
    @message = @chat.messages.build(message_params)
    @message.user = current_user
    @message.sent_at = Time.current

    Rails.logger.info "Processing create with format: #{request.format}"
    if @message.save
      Rails.logger.info "Message saved successfully: #{@message.id}"
      Turbo::StreamsChannel.broadcast_append_to(
        "chat_#{@chat.id}_messages",
        target: "messages",
        partial: "messages/message",
        locals: { message: @message, current_user: current_user }
      )
      respond_to do |format|
        format.turbo_stream { head :ok }
        format.html { redirect_to @chat, notice: "Message sent." }
      end
    else
      Rails.logger.error "Message save failed: #{@message.errors.full_messages}"
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "new_message",
            partial: "messages/form",
            locals: { chat: @chat, message: @message }
          ), status: :unprocessable_entity
        end
        format.html { render "chats/show", status: :unprocessable_entity }
      end
    end
  rescue StandardError => e
    Rails.logger.error "Error in MessagesController#create: #{e.message}\n#{e.backtrace.join("\n")}"
    respond_to do |format|
      format.turbo_stream { render plain: "Server error", status: :internal_server_error }
      format.html { render plain: "Server error", status: :internal_server_error }
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
    @message.destroy
    Turbo::StreamsChannel.broadcast_remove_to(
      "chat_#{@chat.id}_messages",
      target: "message_#{@message.id}"
    )
    respond_to do |format|
      format.turbo_stream { head :ok }
      format.html { head :ok }
    end
  end

  private

  def set_chat
    @chat = Chat.find(params[:chat_id])
  end

  def set_message
    @message = @chat.messages.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:body, :status)
  end
end