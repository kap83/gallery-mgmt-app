class ExhibitionsController < ApplicationController

    def index
        exhibition = Exhibition.all
        render json: exhibition
     end
 
 
     def create
       exhibition = Exhibition.create!(exhibition_params)
       render json: exhibition
     end
 
     def update 
        #only the curator who created the exhibition can update it
          exhibition = find_exhibition
          exhibition.update!(exhibition_params)
          render json: exhibition
     end
 
     def destroy
        #only the curator who created the exhibition can delete it
       exhibition = find_exhibition
       exhibition.destroy
       head :no_content
     end
 
     private 

     def exhibition_params
       params.permit(:id, :title, :gallery, :start_date, :end_date, :user_id)
     end

     def find_exhibition
        Exhibition.find(params[:id])
     end

end
