class TasksController < ApplicationController

    def index
        @tasks = current_user.tasks
        render json: @tasks
    end

    def create
        @task = Task.create(task_params)

        if @task.save
            render json: @task, status: 200
        else
            render json: @task.errors, status: 422
        end
    end

    def update
        @task = Task.find(params[:id])
        @task.update_attributes(task_params)
        render json: @task
    end

    def destroy
        @task = Task.find(params[:id])
        if @task && @task.destroy
            render json: @task, status: 200
        else
            render json: { errors: 'could not destroy task' }, status: 400
        end
    end

    def show
        @task = Task.find(params[:id])
        render json: @task  #include: :user_id?
    end




    private
    def task_params
        params.require(:task).permit(:description, :job_id, :title, :start_time, :end_time, :location)
    end

end
