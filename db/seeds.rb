puts "🌱 Seeding spices..."

User.create(name: 'Sophie Devereaux', username: "sode", password: "testing" )


Exhibition.create(title: 'Latinx Art', gallery: 'A', start_date: '2023-01-01', end_date: '2023-06-30', user_id: 1 )
Exhibition.create(title: 'Black American Art', gallery: 'B', start_date: '2023-03-13', end_date: '2023-12-01', user_id: 1 )

puts "✅ Done seeding!"