class ApplicationController < ActionController::API
    include ActionController::Cookies 
    wrap_parameters format: []

    before_action :authorize

    rescue_from ActiveRecord::RecordInvalid, with: :render_missing_attribute_response

    
def authorize
  @current_user = User.find_by(id: session[:user_id])
end

private

def render_missing_attribute_response(invalid)
  render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
end


end
