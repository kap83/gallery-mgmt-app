puts "🌱 Seeding spices..."


user1 = User.create(name: 'Sophie Devereaux', username: "grifter", password: "testing")
user2 = User.create(name: 'Alec Hardison', username: "geek", password: "password")

user1.avatar.attach(io: File.open(Rails.root.join('db/avatars/sophie.jpg')), filename: 'sophie.jpg')
user2.avatar.attach(io: File.open(Rails.root.join('db/avatars/hardison.jpg')), filename: 'hardison.jpg')

Exhibition.create(title: 'Inspirational Vistas: Harbors', gallery: 'A', start_date: '2023-01-01', end_date: '2023-06-30', user_id: 1 )
Exhibition.create(title: 'Black American Art', gallery: 'B', start_date: '2023-03-13', end_date: '2023-12-01', user_id: 1 )
Exhibition.create(title: 'Among Friends and Rivals: Caravaggio in Rome', gallery: 'C', start_date: '2023-11-13', end_date: '2024-06-01', user_id: 2 )
Exhibition.create(title: 'Love Through the Ages', gallery: 'D', start_date: '2023-10-13', end_date: '2024-07-01', user_id: 2 )

Artist.create(name: 'Paul Klee', date_of_birth: '1879-12-18')
Artist.create(name: 'Georges Braque', date_of_birth: '1882-05-13')
Artist.create(name: 'Robert Bartholow Harshe', date_of_birth: '1879-05-26')
Artist.create(name: 'Martin Johnson Heade', date_of_birth: '1819-08-11')


puts "✅ Done seeding!"