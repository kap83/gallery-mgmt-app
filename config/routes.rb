Rails.application.routes.draw do
#user create, show, destroy

post '/login', to: 'users#create'
get '/me', to: 'users#show'
delete 'logout', to: 'users#destroy'

end
