module ApplicationHelper
  def asset_bundle_path(name)
    manifest && manifest[name].present? ? manifest[name] : name
    # manifest.fetch(name)
  end

  private

  def manifest
    @manifest ||= JSON.parse(File.read('public/packs/manifest.json'))
  end
end
