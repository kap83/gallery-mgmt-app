class ArtistsController < ApplicationController

    def index
        artists = Artist.all
        render json: artists
     end

    
     def create
      artist = Artist.create!(artist_params)
  
      if params[:artwork].present?
        artwork_params = params.require(:artwork).permit(:title, :description, :paintings)
        artist_with_artwork = artist.artworks.create!(artwork_params)
        render json: artist_with_artwork
      else
        render json: artist, include: :artworks
      end
    end

      private

      def artist_params
        params.permit(:id, :name, :date_of_birth)
      end


end
