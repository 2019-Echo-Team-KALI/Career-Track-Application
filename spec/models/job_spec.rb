require 'rails_helper'

RSpec.describe Job, type: :model do
  it "Validates presence of the Company Name" do
    job=Job.new
    expect(job.valid?).to eq(false)
    expect(job.errors[:name]).to_not be_nil
  end
end
