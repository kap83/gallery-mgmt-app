class ExhibitionsController < ApplicationController

  skip_before_action :authorize, only: [:index]

    def index
        exhibitions = Exhibition.all
        render json: exhibitions
     end
 
     def create
       exhibition = @current_user.exhibitions.create(exhibition_params)
       render json: exhibition
     end

     def update
      exhibition = find_exhibition

      if params[:artworks].present?
        artworks = Artwork.all.map do |art|
          a = art.find(:id)
            if a.exhibition_id.nil?
              { exhibition_id: exhibition.id }       
            end #for art.find
        end #for artwork.all.map
       exhibition_with_artwork = exhibition.artworks.each do |artwork|
          artwork.update(exhibition_params[:artwork_attributes])  
        end #for exhibition.artworks
      else 
        render json: exhibition
      end #for if params[:artworks].present?
    end #for update
    
    
 
     def destroy
        #only the curator who created the exhibition can delete it
       exhibition = find_exhibition
       exhibition.destroy
       head :no_content
     end
 
     private 

     def exhibition_params
      permitted_params = params.permit(:id, 
      :title, 
      :gallery, 
      :start_date, 
      :curator,  
      :end_date, 
      artwork_attributes: [{id: '' , exhibition_id: '' }])
    end

     def find_exhibition
      Exhibition.find(params[:id])
     end

    end

