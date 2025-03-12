import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    svgr(),
    typescript({ tsconfig: './tsconfig.build.json' }),
    resolve(),
    peerDepsExternal(),
    postcss({
      inject: false,
      extract: 'styles.css',
      minimize: true,
      modules: {
        generateScopedName: '[local]__[hash:base64:3]'
      }
    }),
    terser()
  ]
};
