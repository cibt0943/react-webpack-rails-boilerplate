source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.2'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.4.4', '< 0.6.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

## Add Gem ##

# View Template
gem 'slim-rails'

# Session Store
gem 'redis-rails'

# Seed Data
gem 'seed-fu'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  ## Add Gem ##

  # デバッガ
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'pry-doc'

  # N+1問題検出
  gem 'bullet'

  # RSpec本体
  gem 'rspec-rails'

  # テスト用データの生成
  gem 'factory_bot_rails'

  # webpack-dev-serverへプロキシ
  gem 'rack-proxy'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  ## Add Gem ##

  # エラー画面の高機能化
  gem 'better_errors'
  gem 'binding_of_caller'

  # コーディングルールチェック
  gem 'rubocop', require: false

  # ER図の生成
  gem 'rails-erd', require: false

  # モデルにテーブル情報のコメントをつける
  gem 'annotate'
  # ソースコード中のコメントからドキュメント生成
  gem 'yard'
  # yardで生成するドキュメントにannotateのテーブル情報を反映
  gem 'kramdown'
  # yardで生成するドキュメントにconcernを反映
  gem 'yard-activesupport-concern'

  # 言語ファイル(ja.yml)生成
  gem 'i18n_generators'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
