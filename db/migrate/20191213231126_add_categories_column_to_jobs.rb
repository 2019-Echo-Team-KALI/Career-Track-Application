class AddCategoriesColumnToJobs < ActiveRecord::Migration[6.0]
  def change
      add_column :jobs, :category, :string
  end
end
