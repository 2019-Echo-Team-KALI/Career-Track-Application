class AddColumnsToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :title, :string
    add_column :tasks, :start_time, :datetime
    add_column :tasks, :end_time, :datetime
    add_column :tasks, :location, :string
  end
end
