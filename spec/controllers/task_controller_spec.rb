require 'rails_helper'

RSpec.describe TasksController, type: :controller do
    it "creates a title" do
        post tasks_path({title: 'This is a title'})
            expect(response).to have_http_status(200)
        end
end
