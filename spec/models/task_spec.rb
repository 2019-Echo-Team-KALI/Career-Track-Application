require 'rails_helper'

RSpec.describe Task, type: :model do
  it "validates presence of title" do
      task = Task.new
      expect(task.valid?).to eq(false)
  end
end
