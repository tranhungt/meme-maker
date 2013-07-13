MemeMaker::Application.routes.draw do
  root to: "Root#root"
  resources :memes
  resources :photos
end