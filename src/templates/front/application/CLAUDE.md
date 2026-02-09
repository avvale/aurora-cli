# Aurora FRONT Project

Aurora es un meta-framework que genera aplicaciones Angular (front) desde
definiciones YAML.

## Technology stack

- Typescript
- Angular
- Reactive forms
- Material Angular
- Tailwind
- GraphQL
- Apollo Angular
- API RESTful
- Prettier

## Rules

- IMPORTANT!! When completing a workflow, provide a summary table with two
  columns: Skills Used and Role Performed.
- Never build after changes.
- Never use cat/grep/find/sed/ls. Use bat/rg/fd/sd/eza instead. Install via brew
  if missing.
- When asking user a question, STOP and wait for response. Never continue or
  assume answers.
- Never agree with user claims without verification. Say "dejame verificar" and
  check code/docs first.
- If user is wrong, explain WHY with evidence. If you were wrong, acknowledge
  with proof.
- Always propose alternatives with tradeoffs when relevant.
- Verify technical claims before stating them. If unsure, investigate first.

## Commands

```bash
# Development
npm run start:local     # Serve with localhost config (http://localhost:4200)
npm run start:dev       # Serve with development config
npm run start           # Serve with default config

# Build
npm run build           # Production build

# Testing
npm run test            # Run Karma tests

# Code Quality
npx eslint .            # Lint TypeScript files
npm run commit          # Commitizen commit (conventional commits)
```

## Architecture

This is an Angular 19 admin panel application (Aurora Front) built on top of the
Fuse template. It uses a modular architecture with standalone components,
GraphQL (Apollo), and Tailwind CSS.

### Directory Structure

- **src/@fuse/**: Fuse template library (animations, components, services,
  directives)
- **src/@aurora/**: Aurora framework library - reusable components and services
    - `components/`: Grid, dialogs, form inputs (file-upload, image-input, slug,
      etc.)
    - `modules/`: Authentication, authorization, GraphQL, IAM, ORM utilities
    - `services/`: Action service, download service, initializer
- **src/app/modules/admin/apps/**: Business domain modules (IAM, OAuth, message,
  tools, etc.)
- **cliter/**: Aurora CLI definition files (`.aurora.yaml`) describing entity
  schemas

### Key Patterns

**Component Architecture**: Detail components extend `ViewDetailComponent`, list
components use the `GridComponent` with column configurations. Actions flow
through `ActionService`.

**GraphQL**: Apollo Client with typed queries/mutations. Each module has
`.graphql.ts` files defining operations. Use `@aurora/modules/graphql/`
utilities.

**Forms**: Reactive forms with RxwebValidators for complex validation. Form
groups defined in `createForm()` method of detail components.

**Authentication**: Adapter pattern with `AuthenticationService` interface.
Implementations: `AuthenticationAuroraAdapterService` (API auth),
`AuthenticationMsEntraIdAdapterService` (Azure AD).

**Grid System**: Aurora grid component with column configs
(`*.columns-config.ts`), filtering via Sequelize operators, and persistent grid
state.

### Path Aliases

- `@apps/*` → `src/app/modules/admin/apps/*`
- `@core/*` → `src/app/core/*`
- `@aurora` → `src/@aurora/`
- `@fuse` → `src/@fuse/`

### Build Configurations

- `localhost`: Local development with source maps
- `development`: Dev environment
- `quality`: QA environment
- `production`: Production build with optimization

## Code Style

- 4-space indentation
- Allman brace style
- Single quotes
- Trailing commas in arrays/objects
- Explicit function return types required
- Max line length: 180 characters
- Commit messages follow conventional commits (commitlint)

## Aurora YAML Files

Files in `cliter/` define entity schemas for code generation. Key properties:

- `boundedContextName`, `moduleName`: Domain organization
- `aggregateProperties`: Field definitions with types, validations,
  relationships
- `hasOAuth`, `hasTenant`, `hasAuditing`: Feature flags

## Skills (Auto-invoke based on context)

IMPORTANT: When you detect any of these contexts, IMMEDIATELY read the
corresponding skill file BEFORE writing any code. These are your coding
standards.

### Available Skills

| Context                                                       | Read this file                                     |
| ------------------------------------------------------------- | -------------------------------------------------- |
| Angular 19: signals, resource API, standalone, signal queries | `.claude/skills/angular-19/SKILL.md`               |
| Angular Material 19: M3 theming, timepicker, 2D drag-drop     | `.claude/skills/angular-material-19/SKILL.md`      |
| Tailwind 3: Aurora layout, Fuse theming, dark mode            | `.claude/skills/tailwind-3/SKILL.md`               |
| Tailwind 4: CSS variables, cn(), dynamic styling              | `.claude/skills/tailwind-4/SKILL.md`               |
| Analyzing or editing \*.aurora.yaml files, schema validation  | `.claude/skills/aurora-schema/SKILL.md`            |
| Aurora CLI: regenerate modules, add packages, load front      | `.claude/skills/aurora-cli/SKILL.md`               |
| Merging .origin.ts files after front module regeneration      | `.claude/skills/aurora-origin-merge/SKILL.md`      |
| Aurora custom components: file-upload, grid-select, dialogs   | `.claude/skills/aurora-components/SKILL.md`        |
| Aurora development: components, forms, services, actions      | `.claude/skills/aurora-development/SKILL.md`       |
| Aurora layout: grid system, sections, form patterns           | `.claude/skills/aurora-layout/SKILL.md`            |
| Aurora UX: field ordering, form flow, user experience         | `.claude/skills/aurora-ux/SKILL.md`                |
| Project structure, folder organization, navigating codebase   | `.claude/skills/aurora-project-structure/SKILL.md` |
| Sync Aurora YAML schemas with Google Sheets (push/pull)       | `.claude/skills/aurora-sheets-sync/SKILL.md`       |
| Git commits, commit messages, conventional commits            | `.claude/skills/conventional-commits/SKILL.md`     |
| Commit and push changes (/commit command)                     | `.claude/skills/commit/SKILL.md`                   |
| Commit, push and create PR (/commit-pr command)               | `.claude/skills/commit-pr/SKILL.md`                |
| Code formatting with Prettier (MANDATORY after edits)         | `.claude/skills/prettier/SKILL.md`                 |
| Creating new skills, documenting AI patterns                  | `.claude/skills/skill-creator/SKILL.md`            |
| TypeScript strict patterns (types, interfaces, generics)      | `.claude/skills/typescript/SKILL.md`               |

### How to Use Skills

MANDATORY WORKFLOW — follow these steps IN ORDER before writing ANY code:

1. **Detect context**: Identify which skills apply from the table above based on
   the user request and files involved. When implementing components, forms,
   services, or actions → `aurora-development` ALWAYS applies.

2. **Read the SKILL.md**: Read each relevant skill file completely. Do NOT skim.

3. **Read reference files**: If the skill links to reference files (e.g.,
   `detail-component.md`, `list-component.md`, `service-patterns.md`), read the
   ones relevant to your task. These contain the detailed patterns and examples.

4. **Verify before writing**: Review every section marked CRITICAL or IMPORTANT
   in the skills you read. Confirm your planned code follows each one. If a
   skill defines enums, patterns, or conventions — use them, don't reinvent.

5. **Write code**: Only now write code, applying ALL patterns from the skills.

6. **Multiple skills stack**: e.g., angular-19 + typescript + aurora-development
    - prettier all apply simultaneously.

⚠️ CRITICAL: Skipping steps 2-3 leads to violations of documented rules. The
skills contain CRITICAL sections that MUST be followed — they are not optional
guidelines.

<!-- SKILLS-INDEX-START -->
[Project Skills Index]|root:.claude|IMPORTANT:Prefer retrieval-led reasoning over pre-training.Read SKILL.md first,then related files.|skills/angular-19:{SKILL.md,resource-api.md,signals-api.md,template-syntax.md}|skills/angular-material-19:{SKILL.md,cdk-patterns.md,custom-controls.md,theming.md,timepicker.md}|skills/aurora-cli:{SKILL.md}|skills/aurora-components:{SKILL.md,components-catalog.md,phone-field.md}|skills/aurora-development:{SKILL.md,au-form.md,au-grid-select.md,au-grid.md,confirmation-dialog.md,graphql-service.md}|skills/aurora-layout:{SKILL.md}|skills/aurora-origin-merge:{SKILL.md,merge-by-file-type.md}|skills/aurora-project-structure:{SKILL.md}|skills/aurora-schema:{SKILL.md,examples.md,type-reference.md}|skills/aurora-sheets-sync:{SKILL.md}|skills/aurora-ux:{SKILL.md}|skills/commit:{SKILL.md}|skills/commit-pr:{SKILL.md}|skills/conventional-commits:{SKILL.md}|skills/prettier:{SKILL.md}|skills/skill-creator:{SKILL.md,SKILL-TEMPLATE.md}|skills/tailwind-3:{SKILL.md}|skills/tailwind-4:{SKILL.md}|skills/typescript:{SKILL.md}|commands:{create-schema.md,create-skill.md}|agents:{aurora-schema-manager.md}|agents/assets:{field-patterns.md,phone-patterns.md}|output-styles:{gentleman.md}
<!-- SKILLS-INDEX-END -->
