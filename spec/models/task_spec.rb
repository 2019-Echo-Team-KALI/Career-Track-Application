require 'rails_helper'

RSpec.describe Task, type: :model do
    it "Validates presence of the task title" do
      task=Task.new
      expect(task.valid?).to eq(false)
      expect(task.errors[:title]).to_not be nil
    end

end
