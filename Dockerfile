# syntax=docker/dockerfile:1
# check=error=true
# Specifies Dockerfile syntax version and enables build checks to catch errors.

# This Dockerfile is designed for production, not development.
# docker build -t app .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name app app
# Instructions for building and running the container in production.

# Define Ruby version argument to match .ruby-version
ARG RUBY_VERSION=3.3.5
# Use the slim Ruby image to reduce size, suitable for production
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Set working directory for the Rails app
WORKDIR /rails

# Install base packages needed at runtime
# - curl: For network operations
# - libjemalloc2: Memory allocator for performance
# - libvips: For image processing
# - libpq-dev: For PostgreSQL database connectivity
# - imagemagick: For ActiveStorage image processing
# - make, gcc, libc-dev: For building native gem extensions (e.g., websocket-driver)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips libpq-dev imagemagick make gcc libc-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Configure environment variables for production
# - RAILS_ENV: Set to production for optimized settings
# - BUNDLE_DEPLOYMENT: Enable deployment mode for Bundler
# - BUNDLE_PATH: Store gems in /usr/local/bundle
# - BUNDLE_WITHOUT: Exclude development gems
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# Build stage for installing gems and precompiling assets
FROM base AS build

# Install build tools for gem compilation
# - build-essential: Includes gcc, g++, make
# - curl, git: For fetching dependencies
# - pkg-config, libyaml-dev: For gem compatibility
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential curl git pkg-config libyaml-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy Gemfile and Gemfile.lock to install gems
COPY Gemfile Gemfile.lock ./
# Install gems, clean up cache, and precompile bootsnap for gem code
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy the full application code
COPY . .

# Precompile bootsnap for app and lib code to improve boot time
RUN bundle exec bootsnap precompile app/ lib/
# Precompile assets without requiring RAILS_MASTER_KEY
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# Final stage for the production image
FROM base

# Copy gems and application code from the build stage
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Create a non-root user for security and set permissions
# - Create rails user/group with UID/GID 1000
# - Set ownership and permissions for runtime directories
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    mkdir -p /rails/storage && \
    chown -R rails:rails db log storage tmp && \
    chmod -R 755 /rails/storage

# Run as non-root user for security
USER 1000:1000

# Expose port 3000 for the Rails server
EXPOSE 3000
# Run migrations and start the Rails server
CMD ["sh", "-c", "./bin/rails db:migrate && ./bin/rails server"]