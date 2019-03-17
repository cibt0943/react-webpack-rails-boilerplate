require 'open-uri'

module ApplicationHelper
  def asset_bundle_path(name)
    manifest.fetch(name)
  end

  private

  def manifest
    webpack = Rails.application.config.x.webpack.deep_symbolize_keys
    @manifest ||= JSON.parse(File.read("#{webpack[:public_root_path]}/#{webpack[:output_path]}/manifest.json"))
  end
end
