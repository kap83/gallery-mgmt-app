Rails.application.routes.draw do
#user create, show, destroy

post '/login', to: 'sessions#create'
get '/me', to: 'users#show'
delete 'logout', to: 'sessions#destroy'

end
