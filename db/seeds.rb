# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_attributes = [

]

job_attributes = [
        {
            name:"Google",
            title: "SWE",
            description: "Testing",
            url: "Google.com",
            user_id: 1
        },
        {
            name:"Facebook",
            title: "SWE-II",
            description: "App making",
            url: "Facebook.com",
            user_id: 1
        }
]

job_attributes.each do |attributes|
    Job.create(attributes)
end
