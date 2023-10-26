class UsersController < ApplicationController
    #create, show, destroy
    
    def create
        user = User.find_by(username: params[:username])
        session[:user_id] = user.id
        render json: user
    end

end
