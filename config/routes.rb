Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'pages#index', constraints: ->(request){ request.format.html? }

  resources :tasks
  resources :jobs
  root to: 'pages#index'
end
