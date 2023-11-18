class ArtworksController < ApplicationController
    before_action :set_artist, only: [:create]

    def index
        render json: Artwork.all
    end

    def create
        artwork = @artist.artworks.create!(artwork_params)
        render json: artwork
      end
    
      private
    
      def set_artist
        @artist = Artist.find(params[:artist_id])
      end
    
      def artwork_params
        params.permit(:title, :medium, :paintings)
      end


end
