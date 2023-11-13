class ApplicationController < ActionController::API
    include ActionController::Cookies 
    wrap_parameters format: []

    before_action :authorize
def authorize
  @current_user = User.find_by(id: session[:user_id])
end

end
