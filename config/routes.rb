Rails.application.routes.draw do
#user create, show, destroy

post '/login', to: 'users#create'


end
