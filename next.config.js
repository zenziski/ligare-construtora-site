const { version } = require('./package.json');
/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    newNextLinkBehavior: false
  },
  swcMinify: true,
  publicRuntimeConfig: {
    version,
  },
  //Por algum motivo isso aqui não está pegando o ENV da maquina, enquanto não vemos isso, 
  //Essa informação ficará estática aqui 
  env: {
    //NEXT_PUBLIC_BACKEND_API: "http://154.56.40.212:3001",
    NEXT_PUBLIC_BACKEND_API: "http://localhost:3001"
  },
}
module.exports = nextConfig