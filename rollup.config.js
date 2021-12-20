import resolve from 'rollup-plugin-node-resolve'; // inport 不需要写后缀index 
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel"; 
import { terser } from 'rollup-plugin-terser'; // 压缩js代码
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import * as pkg from './package.json';

const getPath = _path => path.resolve(__dirname, _path)

const extensions = ['.js', '.ts'];
const isDev = process.env.NODE_ENV !== 'production';

const external = Object.keys(pkg.dependencies)

// ts
const tsPlugin = ts({
  tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
  extensions
})

export default {
  input: 'src/index.ts',
  external,
  output: {
    name: 'toolOy',
    file: 'lib/index.js',
    format: 'umd'
  },
  plugins: [
    resolve({extensions}),
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    tsPlugin,
    babel({
      extensions,
      include: ['./src/**/*'],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    !isDev && terser()
  ]
};