puts "Populating database..."


user1 = User.create(name: 'Sophie Devereaux', username: "grifter", password: "testing")
user2 = User.create(name: 'Alec Hardison', username: "geek", password: "password")

user1.avatar.attach(io: File.open(Rails.root.join('db/avatars/sophie.jpg')), filename: 'sophie.jpg')
user2.avatar.attach(io: File.open(Rails.root.join('db/avatars/hardison.jpg')), filename: 'hardison.jpg')

Exhibition.create(id: 1, title: 'Animals', gallery: 'A', start_date: '2024-10-01', end_date: '2025-06-30', user_id: 1 )
Exhibition.create(id: 2, title: 'Women in Art', gallery: 'B', start_date: '2024-02-13', end_date: '2024-09-01', user_id: 2 )


Artist.create(name: 'Paul Klee', date_of_birth: '1879-12-18')
Artist.create(name: 'Mary Cassatt', date_of_birth: '1844-05-22')
Artist.create(name: 'Franz Marc', date_of_birth: '1880-02-08')



art1 = Artwork.create(title: 'Fleeing Ghost', medium: 'oil on canvas', artist_id: 1)
art2 = Artwork.create(title: 'Strange Glance', medium: 'oil on canvas', artist_id: 1)
art3 = Artwork.create(title: 'Diana', medium: 'oil on canvas', artist_id: 1)
art4 = Artwork.create(title: 'Castle and Sun', medium: 'oil on canvas', artist_id: 1)
art5 = Artwork.create(title: 'Tea', medium: 'oil on canvas', artist_id: 2, exhibition_id: 2)
art6 = Artwork.create(title: 'Woman Bathing', medium: 'color aquatint, with drypoint from three plates, on off-white laid paper', artist_id: 2, exhibition_id: 2)
art7 = Artwork.create(title: "The Child's Bath", medium: 'oil on canvas', artist_id: 2, exhibition_id: 2)
art8 = Artwork.create(title: "Blue Horses", medium: 'oil on canvas', artist_id: 3, exhibition_id: 1)
art9 = Artwork.create(title: "Yellow Cow", medium: 'oil on canvas', artist_id: 3, exhibition_id: 1)
art10 = Artwork.create(title: "Tiger", medium: 'color woodcut print on paper', artist_id: 3, exhibition_id: 1)

art1.paintings.attach(io: File.open(Rails.root.join('db/artworks/Klee_fleeing_ghost.jpg')), filename: 'Klee_fleeing_ghost.jpg')
art2.paintings.attach(io: File.open(Rails.root.join('db/artworks/Klee_strange_glance.jpg')), filename: 'Klee_strange_glance.jpg')
art3.paintings.attach(io: File.open(Rails.root.join('db/artworks/Paul_Klee_Diana.jpg')), filename: 'Paul_Klee_Diana.jpg')
art4.paintings.attach(io: File.open(Rails.root.join('db/artworks/Paul_klee_castle_and_sun.jpg')), filename: 'Paul_klee_castle_and_sun.jpg')
art5.paintings.attach(io: File.open(Rails.root.join('db/artworks/Mary_Cassatt_-_The_Tea.jpg')), filename: 'Mary_Cassatt_-_The_Tea.jpg')
art6.paintings.attach(io: File.open(Rails.root.join('db/artworks/worman_bathing.jpg')), filename: 'Woman Bathing.jpg')
art7.paintings.attach(io: File.open(Rails.root.join('db/artworks/childs_bath.jpg')), filename: 'childs_bath.jpg')
art8.paintings.attach(io: File.open(Rails.root.join('db/artworks/Franz_Marc_005.jpg')), filename: 'Franz_Marc_005')
art9.paintings.attach(io: File.open(Rails.root.join('db/artworks/Franz_Marc-The_Yellow_Cow-1911.jpg')), filename: 'Franz_Marc-The_Yellow_Cow-1911.jpg')
art10.paintings.attach(io: File.open(Rails.root.join('db/artworks/Marc_Franz_-_The_Tiger.jpg')), filename: 'Marc_Franz_-_The_Tiger.jpg')

puts "✅ Done populating!"