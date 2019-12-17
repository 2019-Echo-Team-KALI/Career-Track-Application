class AddDisplayAddToCalendarToTasks < ActiveRecord::Migration[6.0]
  def change
      add_column :tasks, :display_add_to_calendar, :boolean
  end
end
