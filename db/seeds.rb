puts "🌱 Seeding spices..."


user1 = User.create(name: 'Sophie Devereaux', username: "grifter", password: "testing")
user2 = User.create(name: 'Alec Hardison', username: "geek", password: "password")

user1.avatar.attach(io: File.open(Rails.root.join('db/avatars/sophie.jpg')), filename: 'sophie.jpg')
user2.avatar.attach(io: File.open(Rails.root.join('db/avatars/hardison.jpg')), filename: 'hardison.jpg')

Exhibition.create(title: 'Latinx Art', gallery: 'A', start_date: '2023-01-01', end_date: '2023-06-30', user_id: 1 )
Exhibition.create(title: 'Black American Art', gallery: 'B', start_date: '2023-03-13', end_date: '2023-12-01', user_id: 1 )
Exhibition.create(title: 'Among Friends and Rivals: Caravaggio in Rome', gallery: 'C', start_date: '2023-11-13', end_date: '2024-06-01', user_id: 2 )
Exhibition.create(title: 'Love Through the Ages', gallery: 'D', start_date: '2023-10-13', end_date: '2024-07-01', user_id: 2 )

puts "✅ Done seeding!"