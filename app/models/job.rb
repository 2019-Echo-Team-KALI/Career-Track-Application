class Job < ApplicationRecord
    validates :name, :title, presence: true
    has_many :tasks
    belongs_to :user
end
