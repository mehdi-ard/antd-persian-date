const esbuild = require('esbuild');
const { existsSync, mkdirSync, writeFileSync, copyFileSync} = require('fs');
const {join} = require('path');

const lib = join(process.cwd(), 'lib');

if (!existsSync(lib)) {
  mkdirSync(lib);
}

const outTypes = join(__dirname, 'lib/types');
if (!existsSync(outTypes)) mkdirSync(outTypes, { recursive: true });


esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'lib/esm',
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: true,
    format: 'esm',
    target: ['esnext'],
    external: ['antd','react','dayjs','jalaliday','rc-picker'],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile: 'lib/cjs/index.cjs.js',
    bundle: true,
    sourcemap: false,
    minify: true,
    platform: 'node',
    target: ['node16'],
    external: ['antd','react','dayjs','jalaliday','rc-picker'],
  })
  .catch(() => process.exit(1));

copyFileSync(join(__dirname, 'antd-jalali.d.ts'), join(outTypes, 'antd-jalali.d.ts'));

writeFileSync(join(lib, 'index.js'), "export * from './esm/index.js';");

writeFileSync(join(lib, 'index.cjs.js'), "module.exports = require('./cjs/index.cjs.js');");

