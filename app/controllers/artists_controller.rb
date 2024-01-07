class ArtistsController < ApplicationController

    def index
        artists = Artist.all
        render json: artists
     end

     def create
      artist = Artist.create!(artist_params)
      if params[:artwork].present?
        artist.artworks.create!(artwork_params)
        render json: artist
      else
        render json: artist
      end
    end

      private

      def artist_params
        params.permit(:id, :name, :date_of_birth)
      end

      def artwork_params
        params.require(:artwork).permit(:title, :medium, :paintings)
      end



end
