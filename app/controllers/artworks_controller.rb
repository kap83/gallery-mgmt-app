class ArtworksController < ApplicationController
    before_action :set_artist, only: [:create]

    def index
        render json: Artwork.all.with_attached_paintings
    end

    def create
        artwork = @artist.artworks.create!(artwork_params)
        render json: artwork
      end

      def update_exhibition_id(artworks_params, exhibition_id)
        artworks_params.each do |artwork_params|
          artwork = Artwork.find(artwork_params[:id])
          artwork.update(exhibition_id: exhibition_id)
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
