class UsersController < ApplicationController
    #create, show, destroy
    
    def create
        user = User.find_by(username: params[:username])
        session[:user_id] = user.id
        render json: user
    end

    def show 
        user = @current_user
        if user
            render json: user
        else
            render json: {error: "Please Sign In"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content 
    end

end
