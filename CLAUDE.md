# Aurora CLI Project

Aurora CLI (`@aurorajs.dev/cli`) is a code generation tool built with [oclif](https://oclif.io) that scaffolds NestJS backend applications and Angular frontend applications following Domain-Driven Design (DDD) principles. It generates bounded contexts, modules, APIs, value objects, and related boilerplate code from YAML schema definitions.

## Common Commands

```bash
# Build the project (removes dist/, compiles TS, copies templates)
yarn build

# Run tests
yarn test

# Run a single test file
npx mocha --require test/helpers/init.js --require ts-node/register "test/commands/hello/index.test.ts"

# Lint the codebase
yarn lint

# Generate oclif manifest (run before publishing)
yarn prepack

# Deploy (via Makefile)
make deploy
```

## Architecture

### Directory Structure

- `src/commands/` - oclif CLI command definitions (add, generate, load, new, pipeline, etc.)
- `src/@cliter/` - Core code generation engine
  - `handlers/` - Command handlers for different scopes (back, front, pipeline)
  - `types/` - TypeScript interfaces and enums for schema definitions
  - `utils/` - Utilities (template generation, YAML parsing, prompts, code writing)
  - `functions/` - Business logic for file generation (back/, front/, common/)
  - `handlebars/` - Custom Handlebars helpers and partials for templates
  - `prototypes/` - String transformation prototypes (camelCase, PascalCase, snake_case, kebab-case)
  - `store/` - Global state management
- `src/templates/` - Handlebars template files
  - `back/` - Backend templates (@api, @app, application, bounded-context, etc.)
  - `front/` - Frontend Angular templates
  - `pipeline/` - CI/CD pipeline templates

### Code Generation Flow

1. Commands in `src/commands/` parse CLI arguments and flags
2. Commands call handlers in `src/@cliter/handlers/` (e.g., `BackHandler.generateModule()`)
3. Handlers orchestrate file generation via functions in `src/@cliter/functions/`
4. `TemplateGenerator` and `FileManager` process Handlebars templates from `src/templates/`
5. `YamlManager` reads/writes YAML schema definitions to a `cliter/` folder in target projects

### Key Types

The `ModuleDefinitionSchema` (in `src/@cliter/types/index.ts`) is the central data structure defining:
- `boundedContextName`, `moduleName`, `aggregateName`
- `aggregateProperties[]` - Array of `Property` objects with types like ID, VARCHAR, TIMESTAMP, ENUM, RELATIONSHIP, etc.
- `hasOAuth`, `hasTenant`, `hasAuditing` - Feature flags
- `additionalApis[]`, `excludedFiles[]`, `excludedOperations[]`

### Template System

Templates use Handlebars with many custom helpers (100+) in `src/@cliter/handlebars/helpers/` for property filtering, type conversions, and code generation patterns. Template files use `.hbs` extension and support `__variable_name__` placeholders in filenames.

### Scopes

Commands operate on two main scopes:
- `back` - NestJS backend generation
- `front` - Angular frontend generation

Element types include: `bounded-context`, `module`, `api`

## Testing

Tests use Mocha + Chai and are located in `test/`. The test configuration is in `.mocharc.json` with a 60-second timeout. Test helpers are initialized from `test/helpers/init.js`.
