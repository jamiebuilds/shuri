// @flow
'use strict';
const findUp = require('find-up');
const readPkg = require('read-pkg');
const parseJSON = require('parse-json');
const parseJSON5 = require('json5').parse;
const parseYAML = require('js-yaml').safeLoad;
const parseTOML = require('toml').parse;
const promisify = require('util.promisify');
const path = require('path');
const fs = require('fs');

const readFile = promisify(fs.readFile);

/*::
type ConfigExtension =
  | ''
  | '.json'
  | '.json5'
  | '.yml'
  | '.yaml'
  | '.toml';

type FindConfigFileOptions = {
  configName?: string, // .shurirc -> ".shurirc"
  pkgField?: string, // package.json#shuri -> "shuri"
  configExts?: Array<ConfigExtension>, // .shurirc.json -> [".json"]
};
*/

function findConfig(cwd /*: string */, opts /*: FindConfigFileOptions */ = {}) {
  let { configName, pkgField, configExts } = Object.assign({}, {
    configExts: ['', '.json', '.json5', '.yml', '.yaml', '.toml'],
  }, opts);

  let fileNames = [];

  if (configName) {
    configExts.forEach(ext => {
      fileNames.push(`${configName}${ext}`);
    });
  }

  if (pkgField) {
    fileNames.push('package.json');
  }

  function search(cwd) {
    return findUp(fileNames, { cwd }).then(filePath => {
      if (filePath === null) {
        return null;
      }

      let basename = path.basename(filePath);

      if (basename === 'package.json' && pkgField) {
        return readFile(filePath).then(fileContents => {
          return parseJSON(fileContents);
        }).then(json => {
          if (json[pkgField]) {
            return filePath;
          } else {
            return search(path.dirname(path.dirname(filePath)));
          }
        });
      }

      return filePath;
    });
  }

  return search(cwd);
}

/*::
type LoadConfigFileOptions = {
  defaultExt?: string,
  useJSON5?: boolean,
  pkgField?: string,
};
*/

function loadConfig(filePath /*: string */, opts /*: LoadConfigFileOptions */ = {}) {
  let { defaultExt, useJSON5, pkgField } = Object.assign({}, {
    defaultExt: '.json',
    useJSON5: true,
  }, opts);

  let ext = path.extname(filePath);
  let basename = path.basename(filePath);

  if (ext === '' && defaultExt) {
    ext = defaultExt;
  }

  return readFile(filePath).then(fileContents => {
    if (basename === 'package.json' && pkgField) {
      return parseJSON(fileContents)[pkgField];
    } else if (ext === '.json5' || (ext === '.json' && useJSON5)) {
      return parseJSON5(fileContents);
    } else if (ext === '.json') {
      return parseJSON(fileContents);
    } else if (ext === '.yaml' || ext === '.yml') {
      return parseYAML(fileContents);
    } else if (ext === '.toml') {
      return parseTOML(fileContents);
    } else {
      throw new Error(`Unknown file extension "${ext}" (in ${filePath})`);
    }
  });
}

module.exports = {
  findConfig,
  loadConfig
};
