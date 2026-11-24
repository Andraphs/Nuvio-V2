import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind';

Config.overrideWebpackConfig((currentConfiguration) => {
  const withTailwind = enableTailwind(currentConfiguration);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', ...(withTailwind.resolve?.extensions || [])],
    },
    module: {
      ...withTailwind.module,
      rules: [
        ...(withTailwind.module?.rules || []),
        {
          test: /\.m?jsx?$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
});
