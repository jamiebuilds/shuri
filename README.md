# Shuri

> Tools for building awesome tools

## Install

```
yarn add shuri
```

## Usage

```js
const shuri = require('shuri');

const configName = '.shurirc'; // Matches ".shurirc", ".shurirc.json", ".shurirc.yaml", etc.
const pkgField = 'shuri'; // Matches `package.json#shuri`
const defaultConfig = { /* ... */ };

async function main() {
  let cwd = process.cwd();
  let configFile = await shuri.findConfig(cwd, { configName, pkgField });
  let config;

  if (configFile !== null) {
    config = await shuri.loadConfig(configFile, { pkgField });
  } else {
    config = defaultConfig;
  }

  // configFile == '/path/to/.shurirc.json'
  // config == { doStuff: true }
}
```
