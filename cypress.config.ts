import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '4zjcaw',

  e2e: {
    'baseUrl': 'http://localhost/4200'
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'src/',
          buildOptions: {
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            tsConfig: 'tsconfig.app.json',
            inlineStyleLanguage: 'scss',
            scripts: [],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true,
          },
        },
      },
    },
    specPattern: '**/*.spec.ts',
  }

})
