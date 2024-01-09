# Gallery Management Tool

Utilizing a React Frontend and Ruby on Rails/Postgresql backend, the Museum Management Tool streamlines the management of a museum’s exhibition, as well as the artists in the collection and their work. 

Upload image files with confidence. This tool incorporates ActiveStorage to handle the associations between image files and models. ActiveStorage is also prepared to save images locally, or to a cloud service. This tool is programmed to work with Amazon Web Services. 

This tool is perfect for a museum with one or more project managers. Robust validation checks and error handling ensure that only accurate information is loaded to the database. Some validations include: that exhibition titles are unique, that the same artist isn’t uploaded twice, that the same exhibition area isn’t booked twice during the same period (with the help from the overlap gem), and much more.  

Along with extensive in-house CSS, this tool uses react-masonry-css and react-toastify to render a beautiful and easy to use app. 

## Functionality

This tool includes seed data for project managers, exhibitions, artists, and artworks. As this tool is intended for project managers, there is no registration form. For testing purposes, use one of the username and passwords included in the project manager seed file to sign in. Then feel free to add your own artists and art and/or create your own exhibitions, or edit or delete existing ones (only the manager who created the particular exhibition can edit/delete it). Of note, to delete individual artworks, you must do it through the artist's page. A current limitation of the tool is that artworks chosen for an exhibition cannot be removed. 

## Installation issues

If you're having any issues installing vips using rails commands, use brew install vips. 

## Citations

overlap: https://github.com/robinbortlik/validates_overlap

masonry css: https://github.com/paulcollett/react-masonry-css

react-toastify: https://fkhadra.github.io/react-toastify/introduction

login in photo by Zalfa Imani at Unsplash  

gallery icon generated with canva