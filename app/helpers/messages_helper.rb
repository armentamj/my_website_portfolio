module MessagesHelper
  def message_status_indicator(status)
    case status
    when "sent" then content_tag(:span, "✓", class: "red")
    when "delivered" then content_tag(:span, "✓✓", class: "red")
    when "read" then content_tag(:span, "✓✓✓", class: "red")
    else content_tag(:span, "?", class: "red")
    end
  end
end
