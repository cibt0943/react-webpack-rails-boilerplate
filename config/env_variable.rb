# frozen_string_literal: true

# 環境によって値が変わるものを定義
module EnvVariable
  APP_CODE = 'chimera'
  DOMAIN = 'tamechimera'

  WAN_DOMAIN = case Rails.env
               when 'development' then "#{DOMAIN}.com"
               when 'test'        then "#{DOMAIN}.com"
               when 'production'  then "#{DOMAIN}.com"
               end

  LAN_DOMAIN = case Rails.env
               when 'development' then "#{DOMAIN}.lan"
               when 'test'        then "#{DOMAIN}.lan"
               when 'production'  then "#{DOMAIN}.lan"
               end

  SUBDOMAIN = {
    gui: '',
    api: 'api',
    db: 'db',
    cache: 'cache',
  }.freeze

  PROTOCOL = case Rails.env
             when 'development' then 'http'
             when 'test'        then 'http'
             when 'production'  then 'https'
             end

  # DB
  DB = {
    name: "#{APP_CODE}_#{Rails.env}",
    user_name: (case Rails.env
                when 'development'  then 'mysql'
                when 'test'         then 'mysql'
                when 'production'   then 'mysql'
                end),
    password: (case Rails.env
               when 'development' then 'mysql'
               when 'test'        then 'mysql'
               when 'production'  then ENV['CHIMERA_DATABASE_PASSWORD']
               end),
    host: [SUBDOMAIN[:db], LAN_DOMAIN].reject(&:blank?).join('.'),
  }.freeze

  # Redis Base Setting
  REDIS_BASE = {
    host: [SUBDOMAIN[:cache], LAN_DOMAIN].reject(&:blank?).join('.'),
    port: 6379,
    db:   1,
  }.freeze

  # Redis Session
  REDIS_SESSION = {
    host:      REDIS_BASE[:host],
    port:      REDIS_BASE[:port],
    db:        REDIS_BASE[:db],
    namespace: 'sessions',
    url:       "redis://#{REDIS_BASE[:host]}:#{REDIS_BASE[:port]}/#{REDIS_BASE[:db]}/sessions",
  }.freeze

  # Redis Cache
  REDIS_CACHE = {
    host:      REDIS_BASE[:host],
    port:      REDIS_BASE[:port],
    db:        REDIS_BASE[:db],
    namespace: 'cache',
    url:       "redis://#{REDIS_BASE[:host]}:#{REDIS_BASE[:port]}/#{REDIS_BASE[:db]}/cache",
  }.freeze

  # Redis Queue
  REDIS_QUEUE = {
    host:      REDIS_BASE[:host],
    port:      REDIS_BASE[:port],
    db:        REDIS_BASE[:db],
    namespace: 'queue',
    url:       "redis://#{REDIS_BASE[:host]}:#{REDIS_BASE[:port]}/#{REDIS_BASE[:db]}/queue",
  }.freeze
end
