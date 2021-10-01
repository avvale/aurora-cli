aurora-ts-cli
=============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aurora-ts-cli.svg)](https://npmjs.org/package/aurora-ts-cli)
[![Downloads/week](https://img.shields.io/npm/dw/aurora-ts-cli.svg)](https://npmjs.org/package/aurora-ts-cli)
[![License](https://img.shields.io/npm/l/aurora-ts-cli.svg)](https://github.com/carlospalacin/aurora-ts-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g aurora-ts-cli
$ aurora COMMAND
running command...
$ aurora (-v|--version|version)
aurora-ts-cli/0.0.0 darwin-x64 node-v14.17.0
$ aurora --help [COMMAND]
USAGE
  $ aurora COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aurora hello [FILE]`](#aurora-hello-file)
* [`aurora help [COMMAND]`](#aurora-help-command)

## `aurora hello [FILE]`

describe the command here

```
USAGE
  $ aurora hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ aurora hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.0/src/commands/hello.ts)_

## `aurora help [COMMAND]`

display help for aurora

```
USAGE
  $ aurora help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
