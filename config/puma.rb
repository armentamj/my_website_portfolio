# This configuration file will be evaluated by Puma. The top-level methods that
# are invoked here are part of Puma's configuration DSL. For more information
# about methods provided by the DSL, see https://puma.io/puma/Puma/DSL.html.

# Puma can serve each request in a thread from an internal thread pool.
# The `threads` method setting takes two numbers: a minimum and maximum.
# Any libraries that use thread pools should be configured to match
# the maximum value specified for Puma. Default is set to 5 threads for minimum
# and maximum; this matches the default thread size of Active Record.
# config/puma.rb

# Set environment
rails_env = ENV.fetch("RAILS_ENV") { "development" }
environment rails_env

# Detect adapter and decide thread counts
require "active_record"

adapter_name = begin
  ActiveRecord::Base.connection_db_config.adapter
rescue
  ENV['DATABASE_ADAPTER'] || 'sqlite3' # fallback for early boot
end

# Smart thread config based on adapter
if adapter_name.include?("sqlite")
  min_threads = max_threads = 1
else
  max_threads = ENV.fetch("RAILS_MAX_THREADS") { 5 }
  min_threads = ENV.fetch("RAILS_MIN_THREADS") { max_threads }
end

threads min_threads, max_threads

# Worker count for production
if rails_env == "production"
  worker_count = Integer(ENV.fetch("WEB_CONCURRENCY") { 1 })
  if worker_count > 1
    workers worker_count
  else
    preload_app!
  end
end

# Worker timeout in dev
worker_timeout 3600 if rails_env == "development"

port ENV.fetch("PORT") { 3000 }
pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }
plugin :tmp_restart
