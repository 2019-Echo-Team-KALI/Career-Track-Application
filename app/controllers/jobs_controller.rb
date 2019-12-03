class JobsController < ApplicationController
    def index
        @jobs = Job.all
        render json: @jobs
    end

    def create
        @job = current_user.jobs.create(job_params)

        if @job.save
            render json: @job, status: 200
        else
            render json: @job.errors, status, 422
        end
    end

    def destroy
        
    end


    private

    def job_params
        params.require(:job).permit(:name, :title, :description, :url) # we may need to implement the user_id
    end

end
