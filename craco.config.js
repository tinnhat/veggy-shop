const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#077915",
              "@success-color": "#06FF00",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
