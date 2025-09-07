/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/temperature",
        destination: "https://ofcontrol.ir/api/uni/get_temperature.php",
      },
      {
        source: "/api/relays",
        destination: "https://ofcontrol.ir/api/uni/get_relays.php",
      },
      {
        source: "/api/set-relay",
        destination: "https://ofcontrol.ir/api/uni/set_relay.php",
      },
    ];
  },
};

module.exports = nextConfig;
