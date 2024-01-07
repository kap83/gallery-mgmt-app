# Gallery Management Tool

Utilizing a React Frontend and Ruby on Rails/Postgresql backend, Gallery Management Tool streamlines the management of a gallery’s exhibition, as well as the artists in the collection and their work. 

Upload image files such as artworks and user icons with confidence. This tool incorporates ActiveStorage to handle the associations between image files and models. ActiveStorage is also prepared to save images locally, or to a cloud service. This tool is programmed to work with Amazon Web Services. 

This tool is perfect for a gallery with one or more project managers. The robust validation checks and error handling ensure that only accurate information is loaded to the database. Some validations include, that exhibition titles are unique, that the same artist isn’t uploaded twice, that the same exhibition area isn’t booked twice during the same period (with the help of the overlap gem), and much more.  

Along with extensive in-house CSS, this tool uses react-masonry-css and react-toastify to render a beautiful and easy to view app. 


## Citations

overlap: https://github.com/robinbortlik/validates_overlap

masonry css: https://github.com/paulcollett/react-masonry-css

react-toastify: https://fkhadra.github.io/react-toastify/introduction

login in photo by Zalfa Imani at Unsplash  

gallery icon generated with canva