require 'rack/proxy'

module RackProxy
# webpack-dev-serverからのアセット取得をプロキシ
  class DevServerProxy < Rack::Proxy

    def perform_request(env)
      if env['PATH_INFO'].start_with?("/#{webpack[:output_path]}/")
        env['HTTP_HOST'] = dev_server_host
        env['HTTP_X_FORWARDED_HOST'] = dev_server_host
        env['HTTP_X_FORWARDED_SERVER'] = dev_server_host
        super
      else
        @app.call(env)
      end
    end

    private

    def webpack
      @webpack || Rails.application.config.x.webpack.deep_symbolize_keys
    end

    def dev_server_host
      dev_server = webpack[:dev_server]
      "#{dev_server[:host]}:#{dev_server[:port]}"
    end
  end
end
