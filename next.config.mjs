import { Http2ServerRequest } from 'http2';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
          remotePatterns:[
              {
                protocol:"https",
                hostname:"www.shareicon.net",

              }

          ]
    }
};

export default nextConfig;
