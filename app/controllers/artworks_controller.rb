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
      art.destroy
      head :no_content
    end
    
    
      private
    
      def set_artist
        @artist = Artist.find(params[:artist_id])
      end
    
      def artwork_params
        params.permit(:title, :medium, :paintings)
      end


end
