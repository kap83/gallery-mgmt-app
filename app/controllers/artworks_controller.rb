class ArtworksController < ApplicationController
    before_action :set_artist, only: [:create]

    def index
        render json: Artwork.all.with_attached_paintings
    end

    def create
        artwork = @artist.artworks.create!(artwork_params)
        render json: artwork
    end


    def destroy
      art = Artwork.find(params[:id])
      #if art has an exhibition id that is NOT nil
      if art.exhibition_id.present?
        #check that confirm_delete is true
        if params[:confirm_delete] == 'true'
          art.destroy
          head :ok
        else 
          render json: { errors: "Warning! #{art.title} is currently displayed in #{art.exhibition.title}. Do you wish to proceed?" }, status: :unprocessable_entity
        end
        #if art has an exhibition id that is nil, just delete it with no confirmation
      else
        art.destroy
        head :ok
      end
  
    end
    
 

      private
    
      def set_artist
        @artist = Artist.find(params[:artist_id])
      end
    
      def artwork_params
        params.permit(:title, :medium, :paintings)
      end

end
