/** @type {import('next').NextConfig} */
const groupConfig = {
  reactStrictMode: true,
  trailingSlash: false,
};

const myConfig = {
  async rewrites() {
    return [
      {
        source: '/api/covid-data',
        destination: 'https://api.data.gov.sg/v1/covid-19',
      },
    ];
  },
};

module.exports = {
  ...groupConfig,
  ...myConfig,
};
