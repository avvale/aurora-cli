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
aurora-ts-cli/0.0.1 darwin-arm64 node-v16.13.0
$ aurora --help [COMMAND]
USAGE
  $ aurora COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aurora delete ELEMENTTYPE ELEMENTNAME`](#aurora-delete-elementtype-elementname)
* [`aurora generate ELEMENTTYPE`](#aurora-generate-elementtype)
* [`aurora hello`](#aurora-hello)
* [`aurora help [COMMAND]`](#aurora-help-command)
* [`aurora key`](#aurora-key)
* [`aurora load ELEMENTTYPE`](#aurora-load-elementtype)
* [`aurora new APPNAME`](#aurora-new-appname)
* [`aurora seed ELEMENTTYPE`](#aurora-seed-elementtype)

## `aurora delete ELEMENTTYPE ELEMENTNAME`

Delete elements

```
USAGE
  $ aurora delete ELEMENTTYPE ELEMENTNAME

ARGUMENTS
  ELEMENTTYPE  (bounded-context|b|module|m) Type element to delete
  ELEMENTNAME  Name element to create

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/delete.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/delete.ts)_

## `aurora generate ELEMENTTYPE`

Generate hades elements [boundedContext, module]

```
USAGE
  $ aurora generate ELEMENTTYPE

ARGUMENTS
  ELEMENTTYPE  (bounded-context|b|module|m) Type element to create

OPTIONS
  -f, --force
  -g, --noGraphQLTypes
  -h, --help            show CLI help
  -m, --module=module
  -v, --verbose

EXAMPLES
  $ aurora generate module -m=my-bounded-context/my-module --force --noGraphQLTypes
  $ aurora --help
```

_See code: [src/commands/generate.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/generate.ts)_

## `aurora hello`

Test command

```
USAGE
  $ aurora hello

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/hello.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/hello.ts)_

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

## `aurora key`

Generate private key and public key

```
USAGE
  $ aurora key

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/key.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/key.ts)_

## `aurora load ELEMENTTYPE`

Load hades elements [bounded-context, module] from yaml file, located in the cliter folder

```
USAGE
  $ aurora load ELEMENTTYPE

ARGUMENTS
  ELEMENTTYPE  (bounded-context|b|module|m) Type element to create

OPTIONS
  -b, --boundedContext=boundedContext
  -f, --force
  -g, --noGraphQLTypes
  -h, --help                           show CLI help
  -m, --module=module
  -t, --tests
  -v, --verbose
```

_See code: [src/commands/load.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/load.ts)_

## `aurora new APPNAME`

Create new aurora project

```
USAGE
  $ aurora new APPNAME

ARGUMENTS
  APPNAME  Type app name to create

OPTIONS
  -c, --credentials
  -h, --help         show CLI help
```

_See code: [src/commands/new.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/new.ts)_

## `aurora seed ELEMENTTYPE`

Seed database with bounded context or module selected

```
USAGE
  $ aurora seed ELEMENTTYPE

ARGUMENTS
  ELEMENTTYPE  (bounded-context|b|module|m) Type element to create

OPTIONS
  -b, --boundedContext=boundedContext
  -h, --help                           show CLI help
  -l, --log
  -m, --module=module
```

_See code: [src/commands/seed.ts](https://github.com/carlospalacin/aurora-ts-cli/blob/v0.0.1/src/commands/seed.ts)_
<!-- commandsstop -->
