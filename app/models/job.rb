class Job < ApplicationRecord
    has_many :tasks
    belongs_to :user #This relationship will need to be adjusted for _through due to the 3-way relationship
end
