Rails.application.routes.draw do
resources :users, only: [:index]
resources :exhibitions 
resources :artworks, only: [:index, :create, :destroy] 
resources :artists, only: [:index, :show, :create]

get '/me', to: 'users#show'

post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
post '/login', to: 'sessions#create'

delete 'logout', to: 'sessions#destroy'
end
