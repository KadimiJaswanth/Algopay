#!/usr/bin/env node
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

function formatDiagnostics(diagnostics, host) {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, host);
}

function run() {
  const cwd = process.cwd();
  const configPath = ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json');
  if (!configPath) {
    console.error('Could not find tsconfig.json in', cwd);
    process.exit(2);
  }

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    console.error('Error reading tsconfig:', configFile.error.messageText);
    process.exit(2);
  }

  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));

  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  const host = {
    getCurrentDirectory: () => process.cwd(),
    getCanonicalFileName: f => f,
    getNewLine: () => ts.sys.newLine,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options)
  };

  if (diagnostics.length === 0) {
    console.log('No TypeScript diagnostics.');
    return 0;
  }

  const out = formatDiagnostics(diagnostics, host);
  console.log(out);
  return 1;
}

const code = run();
process.exit(code);
