/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/users/1",
        permanent: true,
      },
    ];
  },
};
