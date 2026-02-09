# Aurora BACK Project

Aurora es un meta-framework que genera aplicaciones NestJS (back) desde
definiciones YAML. Implementa:

- Arquitectura Hexagonal (Puertos y Adaptadores)
- CQRS (Command Query Responsibility Segregation)
- Criteria Pattern para consultas complejas
- Patrón ValueObjects para encapsulación y validación de datos
- Sistema de hash para tracking de cambios

## Technology stack

- Typescript
- NestJs
- Sequelize
- PostgreSQL
- API GraphQL
- API RESTful
- Prettier
- Jest
- Supertest

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

## Skills (Auto-invoke based on context)

IMPORTANT: When you detect any of these contexts, IMMEDIATELY read the
corresponding skill file BEFORE writing any code. These are your coding
standards.

### Aurora-Specific Skills

| Context                                                        | Read this file                                     |
| -------------------------------------------------------------- | -------------------------------------------------- |
| Aurora CLI commands (regenerate, load, add packages)           | `.claude/skills/aurora-cli/SKILL.md`               |
| CQRS architecture (structure, flow, editable zones, reference) | `.claude/skills/aurora-cqrs/SKILL.md`              |
| QueryStatement, filters, searches, pagination                  | `.claude/skills/aurora-criteria/SKILL.md`          |
| Business logic in handlers, guards, interceptors, pipes, DI    | `.claude/skills/aurora-development/SKILL.md`       |
| Project structure, folder organization, navigating codebase    | `.claude/skills/aurora-project-structure/SKILL.md` |
| Analyzing or editing \*.aurora.yaml files, schema validation   | `.claude/skills/aurora-schema/SKILL.md`            |
| Sync Aurora schemas with Google Sheets (push, pull, diff)      | `.claude/skills/aurora-sheets-sync/SKILL.md`       |
| Generate CONTEXT.md for bounded contexts from code exploration | `.claude/skills/aurora-context-generator/SKILL.md` |
| Merge .origin.ts files after Aurora CLI regeneration           | `.claude/skills/aurora-origin-merge/SKILL.md`      |
| Migrations SQL, procedures, functions, triggers (tools)        | `.claude/skills/aurora-tools-scripts/SKILL.md`     |
| Git commits, commit messages, conventional commits             | `.claude/skills/conventional-commits/SKILL.md`     |
| Commit and push changes (/commit command)                      | `.claude/skills/commit/SKILL.md`                   |
| Commit, push and create PR (/commit-pr command)                | `.claude/skills/commit-pr/SKILL.md`                |
| Testing (unit, e2e, mocking in NestJS/Aurora)                  | `.claude/skills/jest-nestjs/SKILL.md`              |
| Session logging and reporting                                  | `.claude/skills/logger/SKILL.md`                   |
| PostgreSQL queries, extensions, types, indexing, optimization  | `.claude/skills/postgresql/SKILL.md`               |
| Code formatting with Prettier (MANDATORY after edits)          | `.claude/skills/prettier/SKILL.md`                 |
| e2e API testing with Supertest (HTTP, auth, file upload)       | `.claude/skills/supertest-nestjs/SKILL.md`         |
| Creating new skills, documenting AI patterns                   | `.claude/skills/skill-creator/SKILL.md`            |
| TypeScript strict patterns (types, interfaces, generics)       | `.claude/skills/typescript/SKILL.md`               |

### How to use skills

1. Detect context from user request or current file being edited
2. Read the relevant SKILL.md file(s) BEFORE writing code
3. Apply ALL patterns and rules from the skill
4. Multiple skills can apply (e.g., aurora-criteria + typescript +
   aurora-project-structure)

## Bounded Context Documentation

Before working on any bounded context, check if
`cliter/[bounded-context]/CONTEXT.md` exists and read it to understand the
business domain, modules, and rules. This file contains business logic
documentation specific to each installed bounded context.

<!-- SKILLS-INDEX-START -->
[Project Skills Index]|root:.claude|IMPORTANT:Prefer retrieval-led reasoning over pre-training.Read SKILL.md first,then related files.|skills/aurora-cli:{SKILL.md}|skills/aurora-context-generator:{SKILL.md,CONTEXT-template.md}|skills/aurora-cqrs:{SKILL.md,aggregates.md,commands-queries.md,events-sagas.md,patterns.md,services.md}|skills/aurora-criteria:{SKILL.md,examples.md,operators.md}|skills/aurora-development:{SKILL.md,handlers.md,nestjs-components.md,patterns.md,testing.md}|skills/aurora-origin-merge:{SKILL.md,merge-rules.md}|skills/aurora-project-structure:{SKILL.md}|skills/aurora-schema:{SKILL.md,patterns-workflow.md,types-reference.md}|skills/aurora-sheets-sync:{SKILL.md}|skills/aurora-tools-scripts:{SKILL.md}|skills/commit:{SKILL.md}|skills/commit-pr:{SKILL.md}|skills/conventional-commits:{SKILL.md}|skills/jest-nestjs:{SKILL.md,aurora-testing.md,e2e-testing.md,unit-testing.md}|skills/logger:{SKILL.md}|skills/postgresql:{SKILL.md,data-types.md,indexing.md,performance.md,queries.md}|skills/prettier:{SKILL.md}|skills/skill-creator:{SKILL.md,SKILL-TEMPLATE.md}|skills/supertest-nestjs:{SKILL.md,advanced-patterns.md,auth-testing.md,graphql-testing.md,rest-crud.md}|skills/typescript:{SKILL.md}|commands:{create-schema.md,create-skill.md}|agents:{aurora-schema-manager.md}|agents/assets:{address-patterns.md,field-patterns.md,phone-patterns.md}|output-styles:{gentleman.md}
<!-- SKILLS-INDEX-END -->
