const withAntdLess = require("next-plugin-antd-less");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/variables.less"), "utf8")
);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/khamphavietnam",
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mylocal.vn",
      },
    ],
    domains: [
      "assets-dev.mylocal.vn",
      "assets.mylocal.vn",
      "assets-stagapimylocal01.mylocal.vn",
      "assets.cms.mylocal.vn",
      "assets-dev.cms.mylocal.vn",
      "dtt9gnpt0fl6t.cloudfront.net",
    ],
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.push(
      {
        test: /pdf\.worker\.(min\.)?js/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
              publicPath: "/_next/static/worker",
              outputPath: "static/worker",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
};
