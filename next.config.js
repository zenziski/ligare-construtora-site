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
    NEXT_PUBLIC_TAXLY_API: "https://master.dev.taxly.com.br"
  },
}
module.exports = nextConfig