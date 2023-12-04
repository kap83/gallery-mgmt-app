#create class method( using self) for updating exhibition_ids in artwork

class ArtworkService
    
    def self.update_exhibition_id(artworks_params, exhibition_id)
        #loop through artwork_params
      artworks_params.each do |artwork_params|
        #create an variable that finds Artwork_id that matches the ones in the artwork_params
        artwork = Artwork.find(artwork_params[:id])
        #update the Artwork's exhibition_id with the exhibition_id in params
        artwork.update(exhibition_id: exhibition_id)
      end
    end
  end
  