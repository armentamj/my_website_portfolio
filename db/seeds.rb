require 'faker'

puts "Clearing old data..."

# preserve my instance of user using my email
main_user = User.find_by(email: "armentamj@gmail.com")
users_to_delete = User.where.not(id: main_user&.id)

#delete dependent messages first
Message.where(user: users_to_delete).destroy_all

#delete chats that have users as user or friend)
Chat.where(user: users_to_delete).or(Chat.where(friend: users_to_delete)).destroy_all

#delete all users
users_to_delete.destroy_all

puts "Creating users..."

users = 10.times.map do
  gender = ["male", "female"].sample
  name = Faker::Name.first_name
  motto = Faker::Quote.famous_last_words

  User.create!(
    name: name,
    email: Faker::Internet.unique.email,
    password: 'password',
    motto: motto,
    confirmed_at: Time.current
  )
end

# putting myself in the user list that seed.rb is creating
users << main_user if main_user.present?

puts "Creating chats with messages..."

users.each do |user|
  #picking five random friends for each user, that are not themselves
  friends = users.reject { |u| u == user }.sample(5)

  friends.each do |friend|
    #skip if a chat already exists between both users
    next if Chat.where(user: user, friend: friend).or(Chat.where(user: friend, friend: user)).exists?

    chat = Chat.create!(user: user, friend: friend)
    topic = Faker::Lorem.word

    30.times do
    sender = [user, friend].sample
    Message.create!(
        chat: chat,
        user: sender,
        body: Faker::Lorem.sentence(word_count: rand(5..15)),
        sent_at: Faker::Time.backward(days: 14),
        status: :sent # <-- Add this line to set default status
        )
    end
  end
end

puts "Seeding complete!"
