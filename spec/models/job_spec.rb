require 'rails_helper'

RSpec.describe Job, type: :model do
  it "Validates presence of the Company Name" do
    job=Job.new
    expect(job.valid?).to eq(false)
    expect(job.errors[:name]).to_not be_nil
  end

  it "Validates presence of the Company Title" do
    job=Job.new
    expect(job.valid?).to eq(false)
    expect(job.errors[:title]).to_not be nil
  end

end
