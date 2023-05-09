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
@aurora-ts/cli/2.1.2 darwin-arm64 node-v18.15.0
$ aurora --help [COMMAND]
USAGE
  $ aurora COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aurora add FIRSTARG`](#aurora-add-firstarg)
* [`aurora delete FIRSTARG SECONDARG`](#aurora-delete-firstarg-secondarg)
* [`aurora generate FIRSTARG SECONDARG`](#aurora-generate-firstarg-secondarg)
* [`aurora hello PERSON`](#aurora-hello-person)
* [`aurora hello world`](#aurora-hello-world)
* [`aurora help [COMMAND]`](#aurora-help-command)
* [`aurora keys`](#aurora-keys)
* [`aurora load FIRSTARG SECONDARG`](#aurora-load-firstarg-secondarg)
* [`aurora new FIRSTARG SECONDARG`](#aurora-new-firstarg-secondarg)
* [`aurora pipeline FIRSTARG`](#aurora-pipeline-firstarg)
* [`aurora plugins`](#aurora-plugins)
* [`aurora plugins:install PLUGIN...`](#aurora-pluginsinstall-plugin)
* [`aurora plugins:inspect PLUGIN...`](#aurora-pluginsinspect-plugin)
* [`aurora plugins:install PLUGIN...`](#aurora-pluginsinstall-plugin-1)
* [`aurora plugins:link PLUGIN`](#aurora-pluginslink-plugin)
* [`aurora plugins:uninstall PLUGIN...`](#aurora-pluginsuninstall-plugin)
* [`aurora plugins:uninstall PLUGIN...`](#aurora-pluginsuninstall-plugin-1)
* [`aurora plugins:uninstall PLUGIN...`](#aurora-pluginsuninstall-plugin-2)
* [`aurora plugins update`](#aurora-plugins-update)

## `aurora add FIRSTARG`

Add a aurora package

```
USAGE
  $ aurora add FIRSTARG [-h] [-f]

ARGUMENTS
  FIRSTARG  (back|front) Scope where our command will act.

FLAGS
  -f, --force  Overwrite existing files.
  -h, --help   Show CLI help.

DESCRIPTION
  Add a aurora package

EXAMPLES
  $ aurora add back auditing

  $ aurora add back auditing -f

  $ aurora --help
```

_See code: [dist/commands/add.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/add.ts)_

## `aurora delete FIRSTARG SECONDARG`

Delete elements

```
USAGE
  $ aurora delete FIRSTARG SECONDARG [-h]

ARGUMENTS
  FIRSTARG   (bounded-context|b|module|m) Type element to delete
  SECONDARG  Name element to create

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Delete elements
```

_See code: [dist/commands/delete/index.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/delete/index.ts)_

## `aurora generate FIRSTARG SECONDARG`

Generate aurora item

```
USAGE
  $ aurora generate FIRSTARG SECONDARG -n <value> [-h] [-f] [-g] [-v]

ARGUMENTS
  FIRSTARG   (back|front) Scope where our command will act.
  SECONDARG  (api|bounded-context|module) Type of element to generate.

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

_See code: [dist/commands/generate.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/generate.ts)_

## `aurora hello PERSON`

Say hello

```
USAGE
  $ aurora hello PERSON -f <value>

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

_See code: [dist/commands/hello/index.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/hello/index.ts)_

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

_See code: [dist/commands/keys.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/keys.ts)_

## `aurora load FIRSTARG SECONDARG`

Load aurora [bounded-context, module] from yaml file, located in the cliter folder

```
USAGE
  $ aurora load FIRSTARG SECONDARG -n <value> [-h] [-f] [-g] [-w] [-t] [-v]

ARGUMENTS
  FIRSTARG   (back|front) Scope where our command will act.
  SECONDARG  (bounded-context|module) Type element to load.

FLAGS
  -f, --force               Overwrite existing files.
  -g, --noGraphQLTypes      Avoid generating graphql types.
  -h, --help                Show CLI help.
  -n, --name=<value>        (required) Name of element to load.
  -t, --tests               Create test e2e files.
  -v, --verbose             Reports on screen all the steps followed by the command.
  -w, --overwriteInterface  Overwrite front interfaces.

DESCRIPTION
  Load aurora [bounded-context, module] from yaml file, located in the cliter folder

EXAMPLES
  $ aurora load back module -n=my-bounded-context/my-module

  $ aurora --help
```

_See code: [dist/commands/load.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/load.ts)_

## `aurora new FIRSTARG SECONDARG`

Create new aurora item

```
USAGE
  $ aurora new FIRSTARG SECONDARG [-h] [-f] [-i] [-v]

ARGUMENTS
  FIRSTARG   (back|front) Scope where our command will act.
  SECONDARG  Name of item to create

FLAGS
  -f, --force    Overwrite existing files.
  -h, --help     Show CLI help.
  -i, --install  Install dependencies after create item.
  -v, --verbose  Reports on screen all the steps followed by the command.

DESCRIPTION
  Create new aurora item

EXAMPLES
  $ aurora new back my-app

  $ aurora --help
```

_See code: [dist/commands/new.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/new.ts)_

## `aurora pipeline FIRSTARG`

Generate pipeline to deploy application in cloud

```
USAGE
  $ aurora pipeline FIRSTARG [-h] [-f]

ARGUMENTS
  FIRSTARG  (back|front) Scope where our command will act.

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

_See code: [dist/commands/pipeline.ts](https://github.com/techedge-group/aurora-cli/blob/v2.1.2/dist/commands/pipeline.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.0/src/commands/plugins/index.ts)_

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

GLOBAL FLAGS
  --json  Format output as json.

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
<!-- commandsstop -->
