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
$ npm install -g @aurora-ts/cli
$ aurora COMMAND
running command...
$ aurora (--version)
@aurora-ts/cli/2.0.1 darwin-arm64 node-v16.15.0
$ aurora --help [COMMAND]
USAGE
  $ aurora COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aurora add`](#aurora-add)
* [`aurora delete ELEMENTTYPE ELEMENTNAME`](#aurora-delete-elementtype-elementname)
* [`aurora generate SCOPE ELEMENT`](#aurora-generate-scope-element)
* [`aurora hello PERSON`](#aurora-hello-person)
* [`aurora hello world`](#aurora-hello-world)
* [`aurora help [COMMAND]`](#aurora-help-command)
* [`aurora keys`](#aurora-keys)
* [`aurora load SCOPE ELEMENT`](#aurora-load-scope-element)
* [`aurora new SCOPE NAME`](#aurora-new-scope-name)
* [`aurora pipeline SCOPE`](#aurora-pipeline-scope)
* [`aurora plugins`](#aurora-plugins)
* [`aurora plugins:install PLUGIN...`](#aurora-pluginsinstall-plugin)
* [`aurora plugins:inspect PLUGIN...`](#aurora-pluginsinspect-plugin)
* [`aurora plugins:install PLUGIN...`](#aurora-pluginsinstall-plugin-1)
* [`aurora plugins:link PLUGIN`](#aurora-pluginslink-plugin)
* [`aurora plugins:uninstall PLUGIN...`](#aurora-pluginsuninstall-plugin)
* [`aurora plugins:uninstall PLUGIN...`](#aurora-pluginsuninstall-plugin-1)
* [`aurora plugins:uninstall PLUGIN...`](#aurora-pluginsuninstall-plugin-2)
* [`aurora plugins update`](#aurora-plugins-update)
* [`aurora seed ELEMENTTYPE`](#aurora-seed-elementtype)

## `aurora add`

Generate pipeline to deploy application in cloud

```
USAGE
  $ aurora add [-h] [-f] [-d]

FLAGS
  -d, --dashboard
  -f, --force
  -h, --help       Show CLI help.

DESCRIPTION
  Generate pipeline to deploy application in cloud

EXAMPLES
  $ aurora add

  $ aurora --help
```

_See code: [dist/commands/add/index.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/add/index.ts)_

## `aurora delete ELEMENTTYPE ELEMENTNAME`

Delete elements

```
USAGE
  $ aurora delete [ELEMENTTYPE] [ELEMENTNAME] [-h]

ARGUMENTS
  ELEMENTTYPE  (bounded-context|b|module|m) Type element to delete
  ELEMENTNAME  Name element to create

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Delete elements
```

_See code: [dist/commands/delete/index.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/delete/index.ts)_

## `aurora generate SCOPE ELEMENT`

Generate aurora item

```
USAGE
  $ aurora generate [SCOPE] [ELEMENT] -n <value> [-h] [-f] [-g] [-v]

ARGUMENTS
  SCOPE    (back|front) Scope where our command will act.
  ELEMENT  (api|bounded-context|module) Type of element to generate.

FLAGS
  -f, --force           Overwrite existing files.
  -g, --noGraphQLTypes  Avoid generating graphql types.
  -h, --help            Show CLI help.
  -n, --name=<value>    (required) Name of element to generate.
  -v, --verbose         Reports on screen all the steps followed by the command.

DESCRIPTION
  Generate aurora item

EXAMPLES
  $ aurora generate back module -n=my-bounded-context/my-module

  $ aurora --help
```

_See code: [dist/commands/generate.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/generate.ts)_

## `aurora hello PERSON`

Say hello

```
USAGE
  $ aurora hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/hello/index.ts)_

## `aurora hello world`

Say hello world

```
USAGE
  $ aurora hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ aurora hello world
  hello world! (./src/commands/hello/world.ts)
```

## `aurora help [COMMAND]`

Display help for aurora.

```
USAGE
  $ aurora help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for aurora.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.20/src/commands/help.ts)_

## `aurora keys`

Generate private key and public key

```
USAGE
  $ aurora keys [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Generate private key and public key

EXAMPLES
  $ aurora keys

  $ aurora --help
```

_See code: [dist/commands/keys.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/keys.ts)_

## `aurora load SCOPE ELEMENT`

Reload aurora [bounded-context, module] from yaml file, located in the cliter folder

```
USAGE
  $ aurora load [SCOPE] [ELEMENT] -n <value> [-h] [-f] [-g] [-w] [-t] [-v]

ARGUMENTS
  SCOPE    (back|front|back-package) Scope where our command will act.
  ELEMENT  (bounded-context|module) Type element to load.

FLAGS
  -f, --force               Overwrite existing files.
  -g, --noGraphQLTypes      Avoid generating graphql types.
  -h, --help                Show CLI help.
  -n, --name=<value>        (required) Name of element to load.
  -t, --tests               Create test e2e files.
  -v, --verbose             Reports on screen all the steps followed by the command.
  -w, --overwriteInterface  Overwrite front interfaces.

DESCRIPTION
  Reload aurora [bounded-context, module] from yaml file, located in the cliter folder

EXAMPLES
  $ aurora load back module -n=my-bounded-context/my-module

  $ aurora --help
```

_See code: [dist/commands/load.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/load.ts)_

## `aurora new SCOPE NAME`

Create new aurora item

```
USAGE
  $ aurora new [SCOPE] [NAME] [-h] [-i] [-v]

ARGUMENTS
  SCOPE  (back|front|back-package) Scope where our command will act.
  NAME   Name of item to create

FLAGS
  -h, --help     Show CLI help.
  -i, --install  Install dependencies after create item.
  -v, --verbose  Reports on screen all the steps followed by the command.

DESCRIPTION
  Create new aurora item

EXAMPLES
  $ aurora new back my-app

  $ aurora --help
```

_See code: [dist/commands/new.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/new.ts)_

## `aurora pipeline SCOPE`

Generate pipeline to deploy application in cloud

```
USAGE
  $ aurora pipeline [SCOPE] [-h] [-f]

ARGUMENTS
  SCOPE  (back|front) Scope where our command will act.

FLAGS
  -f, --force  Overwrite existing files.
  -h, --help   Show CLI help.

DESCRIPTION
  Generate pipeline to deploy application in cloud

EXAMPLES
  $ aurora pipeline back

  $ aurora pipeline front -f

  $ aurora --help
```

_See code: [dist/commands/pipeline.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/pipeline.ts)_

## `aurora plugins`

List installed plugins.

```
USAGE
  $ aurora plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ aurora plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.9/src/commands/plugins/index.ts)_

## `aurora plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ aurora plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ aurora plugins add

EXAMPLES
  $ aurora plugins:install myplugin 

  $ aurora plugins:install https://github.com/someuser/someplugin

  $ aurora plugins:install someuser/someplugin
```

## `aurora plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ aurora plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ aurora plugins:inspect myplugin
```

## `aurora plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ aurora plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ aurora plugins add

EXAMPLES
  $ aurora plugins:install myplugin 

  $ aurora plugins:install https://github.com/someuser/someplugin

  $ aurora plugins:install someuser/someplugin
```

## `aurora plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ aurora plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ aurora plugins:link myplugin
```

## `aurora plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ aurora plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aurora plugins unlink
  $ aurora plugins remove
```

## `aurora plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ aurora plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aurora plugins unlink
  $ aurora plugins remove
```

## `aurora plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ aurora plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aurora plugins unlink
  $ aurora plugins remove
```

## `aurora plugins update`

Update installed plugins.

```
USAGE
  $ aurora plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `aurora seed ELEMENTTYPE`

Seed database with bounded context or module selected

```
USAGE
  $ aurora seed [ELEMENTTYPE] [-h] [-m <value>] [-b <value>] [-v]

ARGUMENTS
  ELEMENTTYPE  (bounded-context|b|module|m) Type element to create

FLAGS
  -b, --boundedContext=<value>
  -h, --help                    Show CLI help.
  -m, --module=<value>
  -v, --verbose

DESCRIPTION
  Seed database with bounded context or module selected
```

_See code: [dist/commands/seed/index.ts](https://github.com/techedge-group/aurora-cli/blob/v2.0.1/dist/commands/seed/index.ts)_
<!-- commandsstop -->
