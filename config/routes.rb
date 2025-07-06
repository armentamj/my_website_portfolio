Rails.application.routes.draw do
  devise_for :users
  mount ActionCable.server => '/cable'

  resources :chats, only: [:index, :show, :create, :destroy] do
    resources :messages, only: [:create, :destroy]
    collection do
      get 'search'
    end
  end

  # ✅ Add this block
  resources :messages, only: [] do
    post :mark_read, on: :member
  end

  root to: "pages#home"

  # Other custom static routes
  get "up" => "rails/health#show", as: :rails_health_check
  get "showcase", to: "pages#showcase"
  get "get_weather", to: "pages#get_weather"
  get "contact", to: "pages#contact"
end
