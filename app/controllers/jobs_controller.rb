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
            render json: @job.errors, status: 422
        end
    end

    def update
        @job = Job.find(params[:id])
        @job.update_attributes(job_params)
        render json: @job
    end

    def destroy
        @job = Job.find(params[:id])

        if @job.destroy
            # redirect_to: 'careerpage'
        else
            render json: @job.errors, status: :unprocessable_entity
        end
    end

    def show
        @job = Job.find(params[:id])
        render json: @job  #include: :user_id
    end




    private
    def job_params
        params.require(:job).permit(:name, :title, :description, :url, :user_id)
    end

end
