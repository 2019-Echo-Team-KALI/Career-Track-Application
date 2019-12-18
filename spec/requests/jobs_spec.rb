require 'rails_helper'

RSpec.describe "Jobs", type: :request do
    let!(:user) {User.create!(email: 'test@test.com', password: '123456')}
    describe "GET/jobs" do
        it "works! (now write some real specs)" do
            sign_in user
            get jobs_path
            expect(response).to have_http_status(200)
        end
    end

    context 'POST #create' do
        it "creates a new job" do
        sign_in user
        params = {
            name: 'Job 1 Name',
            title: 'Job 1 Title'
        }
        expect {post(jobs_path, params: {job:params})}.to change(Job, :count).by(1)
        end
    end


    context 'PUT #update' do
        it "updates the job for the logged in user" do
            sign_in user

            job = Job.create!(name: 'Job2', title: 'Job2 title', user: user)
            params= {
                name: 'updated job2',
                title: 'updated job2 title'
            }
            patch job_path(job.id), params: { job: params }
            job.reload
            params.keys.each do |key|
                expect(job.attributes[key.to_s]).to eq params[key]
            end
        end
    end

    context 'DELETE #destroy' do
        it "deletes a job for the logged in user" do
            sign_in user

            job = Job.create!(name:'job3', title: 'job3 title', user: user)
            expect {delete(job_path(job.id))}.to change(Job, :count).by(-1)
        end
    end

end
