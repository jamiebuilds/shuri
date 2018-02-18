// @flow
'use strict';
const test = require('ava');
const path = require('path');
const fixtures = require('fixturez');
const shuri = require('./');

const f = fixtures(__dirname, { root: __dirname });

test('findConfig() - opts.pkgField', t => {
  let rootDir = f.find('config-package-json');
  return shuri.findConfig(rootDir, {
    pkgField: 'shuri'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, 'package.json'));
  });
});

test('findConfig() - opts.pkgField - nested', t => {
  let rootDir = f.find('config-package-json');
  let nestedDir = path.join(rootDir, 'nested');
  return shuri.findConfig(nestedDir, {
    pkgField: 'shuri'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, 'package.json'));
  });
});

test('findConfig() - opts.configName - no ext', t => {
  let rootDir = f.find('config-no-ext');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, '.shurirc'));
  });
});

test('findConfig() - opts.configName - json', t => {
  let rootDir = f.find('config-json');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, '.shurirc.json'));
  });
});

test('findConfig() - opts.configName - json5', t => {
  let rootDir = f.find('config-json5');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, '.shurirc.json5'));
  });
});

test('findConfig() - opts.configName - yaml', t => {
  let rootDir = f.find('config-yaml');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, '.shurirc.yaml'));
  });
});

test('findConfig() - opts.configName - yml', t => {
  let rootDir = f.find('config-yml');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, '.shurirc.yml'));
  });
});

test('findConfig() - opts.configName - toml', t => {
  let rootDir = f.find('config-toml');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, path.join(rootDir, '.shurirc.toml'));
  });
});

test('findConfig() - opts.configName - missing', t => {
  let rootDir = f.find('config-missing');
  return shuri.findConfig(rootDir, {
    configName: '.shurirc'
  }).then(filePath => {
    t.is(filePath, null);
  });
});

test('loadConfig() - package.json', t => {
  let configPath = path.join(f.find('config-package-json'), 'package.json');
  return shuri.loadConfig(configPath, {
    pkgField: 'shuri'
  }).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});

test('loadConfig() - package.json', t => {
  let configPath = path.join(f.find('config-package-json'), 'package.json');
  return shuri.loadConfig(configPath, {
    pkgField: 'shuri'
  }).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});

test('loadConfig() - json', t => {
  let configPath = path.join(f.find('config-json'), '.shurirc.json');
  return shuri.loadConfig(configPath).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});

test('loadConfig() - json5', t => {
  let configPath = path.join(f.find('config-json5'), '.shurirc.json5');
  return shuri.loadConfig(configPath).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});

test('loadConfig() - yaml', t => {
  let configPath = path.join(f.find('config-yaml'), '.shurirc.yaml');
  return shuri.loadConfig(configPath).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});

test('loadConfig() - yml', t => {
  let configPath = path.join(f.find('config-yml'), '.shurirc.yml');
  return shuri.loadConfig(configPath).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});

test('loadConfig() - toml', t => {
  let configPath = path.join(f.find('config-toml'), '.shurirc.toml');
  return shuri.loadConfig(configPath).then(config => {
    t.deepEqual(config, {
      foo: true
    });
  });
});
