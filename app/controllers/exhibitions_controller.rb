class ExhibitionsController < ApplicationController

  skip_before_action :authorize, only: [:index]

    def index
        exhibitions = Exhibition.all
        render json: exhibitions
     end
 
     def create
       exhibition = @current_user.exhibitions.create!(exhibition_params)
       render json: exhibition
     end

   

   def update
    exhibition = find_exhibition
    exhibition.update(exhibition_params)
    update_artworks(exhibition)
    render json: exhibition, status: :ok
  end
   
 
     def destroy
        #only the curator who created the exhibition can destroy
       exhibition = find_exhibition
       if exhibition.user == @current_user
        exhibition.destroy 
        head :no_content
       else
        head :unauthorized 
       end
     end
 
     private 

     def exhibition_params
      permitted_params = params.permit(:id, 
      :title, 
      :gallery, 
      :start_date, 
      :curator,  
      :end_date,
      :user_id 
      )
    end

    def artwork_params
      params.require(:artwork).permit(:title, :medium, :artist_id, :paintings)
    end

     def find_exhibition
      Exhibition.find(params[:id])
     end

     #create method that sends the exhibition_id and artwork params to the artwork service
     def update_artworks(exhibition)
      ArtworkService.update_exhibition_id(params[:artworks], exhibition.id)
     end

    end

