require 'rails_helper'

RSpec.describe "Tasks", type: :request do
    let!(:user) {User.create!(email: 'test@test.com', password: '123456')}
    let!(:job) {user.jobs.create!(name: 'job name', title: 'job title')}
    describe "GET/tasks" do
        it "works! (now write some real specs)" do
            sign_in user
            get tasks_path
            expect(response).to have_http_status(200)
        end
    end

    context 'POST #create' do
        it "creates a new task" do
            sign_in user
            params = {
                title: 'Task 1 Title',
                job_id: job.id
            }
            expect {post(tasks_path, params: {task:params})}.to change(Task, :count).by(1)
        end
    end


    context 'PUT #update' do
        it "updates the task for the logged in user" do
            sign_in user

            task = Task.create!(title: 'Task2 title', job_id: job.id)
            params= {
                title: 'Task title update',
                job_id: job.id
            }
            patch task_path(task.id), params: { task: params }
            task.reload
            params.keys.each do |key|
                expect(task.attributes[key.to_s]).to eq params[key]
            end
        end
    end

    context 'DELETE #destroy' do
        it "deletes a task for the logged in user" do
            sign_in user

            task = Task.create!(title: 'task3 title', job_id: job.id)
            expect {delete(task_path(task.id))}.to change(Task, :count).by(-1)
        end
    end

end
