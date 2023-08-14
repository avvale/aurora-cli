/* eslint-disable unicorn/no-array-push-push */
import { Command } from '@oclif/core';
import { GenerateCommandState, Scope, RelationshipType, PropertyType } from '../types';
import { Property } from './property';
import { cliterConfig } from '../config/cliter.config';
import { getBoundedContextModuleFromFlag } from '../functions/common';
import { Properties } from './properties';
import * as inquirer from 'inquirer';
import * as Table from 'cli-table3';
import * as _ from 'lodash';

export const Prompter =
{
    async promptForLoadModule(boundedContextName?: string, moduleName?: string)
    {
        const questions = [];

        questions.push({
            name   : 'boundedContextName',
            message: 'Input the name of bonded context where will be created your module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (boundedContextName)
                {
                    answers.boundedContextName = boundedContextName;
                    return false;
                }

                return true;
            },
        }, {
            name   : 'moduleName',
            message: 'Input the name of module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (moduleName)
                {
                    answers.moduleName = moduleName;
                    return false;
                }

                return true;
            },
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase(),
            moduleName        : response.moduleName.toKebabCase(),
        };
    },

    async promptForLoadBoundedContext(boundedContextName?: string)
    {
        const questions = [];

        questions.push({
            name   : 'boundedContextName',
            message: 'Input the name of bonded context where will be created your module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (boundedContextName)
                {
                    answers.boundedContextName = boundedContextName;
                    return false;
                }

                return true;
            },
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase(),
        };
    },

    async promptForGenerateModule(boundedContextName?: string, moduleName?: string)
    {
        const questions = [];

        questions.push({
            name   : 'boundedContextName',
            message: 'Input the name of bonded context where will be created your module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (boundedContextName)
                {
                    answers.boundedContextName = boundedContextName;
                    return false;
                }

                return true;
            },
        }, {
            name   : 'moduleName',
            message: 'Input the name of module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (moduleName)
                {
                    answers.moduleName = moduleName;
                    return false;
                }

                return true;
            },
        }, {
            name   : 'moduleNames',
            message: 'Input the plural of the module name in kebab case format',
            type   : 'input',
        }, {
            name   : 'hasOAuth',
            message: 'do you want to protect this module with OAuth?',
            type   : 'confirm',
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase(),
            moduleName        : response.moduleName.toKebabCase(),
            moduleNames       : response.moduleNames.toKebabCase(),
            hasOAuth          : response.hasOAuth,
            hasTenant         : false,
        };
    },

    async promptForGenerateAggregate(): Promise<{ hasValueObject: boolean }>
    {
        const questions = [];

        questions.push({
            name   : 'hasValueObject',
            message: 'Do you want to define a property?',
            type   : 'confirm',
        });

        return inquirer.prompt(questions);
    },

    async promptSelectOriginFileToManage(files: string[])
    {
        const questions = [];

        questions.push({
            name   : 'fileToManage',
            message: 'Select file to manage',
            type   : 'list',
            choices: files,
        });

        return inquirer.prompt(questions);
    },

    async promptSelectManagementAction()
    {
        const questions = [];

        questions.push({
            name   : 'compareAction',
            message: 'Select an action',
            type   : 'list',
            choices: Object.values(cliterConfig.compareActions),
        });

        return inquirer.prompt(questions);
    },

    async promptManageOriginFiles()
    {
        const questions = [];

        questions.push({
            name   : 'hasCompareOriginFile',
            message: 'Do you want to manage origin files?',
            type   : 'confirm',
        });

        return inquirer.prompt(questions);
    },

    async promptDefineAggregateProperty(generateCommandState: GenerateCommandState): Promise<Property>
    {
        const questions = [];
        let name        = '';

        questions.push({
            name    : 'name',
            message : 'What\'s the name of property (type in camel case, example: dateAt)',
            type    : 'input',
            validate: (input: string, answers: any) =>
            {
                name = input;
                return true;
            },
        });

        // only if filed end with Id
        questions.push({
            name   : 'relationship.type',
            message: 'What kind of relationship do you want to create?',
            type   : 'list',
            choices: Object.values(RelationshipType).filter(item => ['none', 'one-to-one', 'many-to-one'].includes(item)),
            when   : (answers: any) =>
            {
                if (answers.name.endsWith('Id'))
                {
                    answers.type = 'id';
                    answers.length = 36;
                    return true;
                }

                return false;
            },
        });

        questions.push({
            name   : 'type',
            message: 'What\'s the type of property?',
            type   : 'list',
            choices: Object.values(PropertyType),
            when   : (answers: any) => !answers.type,
        });

        questions.push({
            name   : 'enumOptions',
            message: 'Set comma separated enumeration options, example: ONE,TWO,THREE,FOUR',
            type   : 'input',
            when   : (answers: any) => answers.type === PropertyType.ENUM,
        });

        questions.push({
            name   : 'relationship.type',
            message: 'What kind of relationship do you want to create?',
            type   : 'list',
            choices: Object.values(RelationshipType).filter(item => !['many-to-one'].includes(item)),
            when   : (answers: any) => answers.type === PropertyType.RELATIONSHIP,
        });

        questions.push({
            name   : 'relationship.singularName',
            message: 'The property name will be plural, type its singular (example: for cars type car)',
            type   : 'input',
            when   : (answers: any) =>
                answers.relationship?.type === RelationshipType.ONE_TO_MANY ||
                answers.relationship?.type === RelationshipType.MANY_TO_MANY,
        });

        questions.push({
            name   : 'relationship.aggregate',
            message: 'What is the aggregate which you want to relate this property? (example: AdminLang)',
            type   : 'input',
            when   : (answers: any) =>
                answers.relationship?.type === RelationshipType.ONE_TO_ONE ||
                answers.relationship?.type === RelationshipType.MANY_TO_ONE ||
                answers.relationship?.type === RelationshipType.ONE_TO_MANY ||
                answers.relationship?.type === RelationshipType.MANY_TO_MANY,
        });

        questions.push({
            name   : 'relationship.modulePath',
            message: 'Type path to module where to find the aggregate with which you want to relate this property? Type with format: bounded-context/module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (
                    answers.relationship?.type === RelationshipType.ONE_TO_ONE &&
                    answers.name.endsWith('Id')
                )
                {
                    answers.type = 'id';
                    answers.length = 36;
                }

                // by default all many to many relationship will be nullable
                if (answers.relationship?.type === RelationshipType.MANY_TO_MANY) answers.nullable =  true;

                return  answers.relationship?.type === RelationshipType.ONE_TO_ONE ||
                        answers.relationship?.type === RelationshipType.MANY_TO_ONE ||
                        answers.relationship?.type === RelationshipType.ONE_TO_MANY ||
                        answers.relationship?.type === RelationshipType.MANY_TO_MANY;
            },
        });

        questions.push({
            name   : 'hasPivotTable',
            message: () => `You want to create the pivot table of your many to many relationship with name: ${generateCommandState.schema.boundedContextName.toPascalCase()}${generateCommandState.schema.moduleNames.toPascalCase()}${name.toPascalCase()}?`,
            type   : 'confirm',
            when   : (answers: any) =>
            {
                return answers.relationship?.type === RelationshipType.MANY_TO_MANY;
            },
        });

        questions.push({
            name   : 'decimals',
            message: 'Set total digits and decimals comma separated, example: 10,2',
            type   : 'input',
            when   : (answers: any) => answers.type === PropertyType.DECIMAL,
            filter : (answers: string) => answers.split(',').map(item => Number.parseInt(item.trim(), 10)),
        });

        questions.push({
            name   : 'length',
            message: 'What\'s the length of property? Push enter to use the default length',
            type   : 'number',
            when   : (answers: any) =>
            {
                // avoid length for decimal values
                if (answers.type === PropertyType.DECIMAL || answers.type === PropertyType.FLOAT) return false;

                // set pivot.aggregate value
                if (answers.hasPivotTable)
                {
                    answers.relationship.pivot.aggregate  = `${generateCommandState.schema.boundedContextName.toPascalCase()}${generateCommandState.schema.moduleName.toPascalCase()}${answers.relationship.singularName.toPascalCase()}`;
                    answers.relationship.pivot.modulePath = `${generateCommandState.schema.boundedContextName}/${generateCommandState.schema.moduleName}`;
                }

                if (!answers.hasPivotTable && answers.relationship?.type === RelationshipType.MANY_TO_MANY)
                {
                    const relationshipModulePath = getBoundedContextModuleFromFlag(generateCommandState.command, answers.relationship.modulePath);
                    answers.relationship.pivot.aggregate  = `${relationshipModulePath.boundedContextName.toPascalCase()}${answers.relationship.singularName.toPascalCase()}${generateCommandState.schema.moduleName.toPascalCase()}`;
                    answers.relationship.pivot.modulePath = answers.relationship.modulePath;
                }

                if (answers.relationship?.type) return false;

                // eslint-disable-next-line unicorn/explicit-length-check
                return Object.keys(cliterConfig.defaultTypeLength).includes(answers.type) && !answers.length;
            },
        });

        questions.push({
            name   : 'nullable',
            message: 'This property will be nullable?',
            type   : 'confirm',
            when   : (answers: any) =>
            {
                if (answers.relationship?.type === RelationshipType.ONE_TO_MANY)
                {
                    // a field with relation one-to-many always will be nullable
                    answers.nullable = true;
                    return false;
                }

                if (answers.relationship?.type === RelationshipType.MANY_TO_MANY)
                {
                    // answers.nullable = true;
                    return false;
                }

                return true;
            },
        });

        const response = await inquirer.prompt(questions);

        // add default length
        // eslint-disable-next-line unicorn/explicit-length-check
        if (Object.keys(cliterConfig.defaultTypeLength).includes(response.type) && !response.length) response.length = cliterConfig.defaultTypeLength[response.type];

        return new Property({
            name         : response.name,
            type         : response.type,
            primaryKey   : response.name === 'id' ? true : undefined, // by default if field name is id will be primary key
            autoIncrement: response.autoIncrement,
            enumOptions  : response.enumOptions,
            decimals     : response.decimals,
            length       : response.length,
            minLength    : response.minLength,
            maxLength    : response.maxLength,
            nullable     : response.nullable,
            defaultValue : response.defaultValue,
            // delete relationship with none value
            relationship : response.relationship ?
                (response.relationship.type === RelationshipType.NONE ?
                    undefined :
                    {
                        type           : response.relationship.type,
                        singularName   : response.relationship.singularName,
                        aggregateName  : response.relationship.aggregateName,
                        modulePath     : response.relationship.modulePath,
                        key            : response.relationship.type === RelationshipType.MANY_TO_ONE ? 'id' : undefined, // set default relationship key to id
                        field          : response.relationship.type === RelationshipType.MANY_TO_ONE || (response.relationship.type === RelationshipType.ONE_TO_ONE && response.name.endsWith('Id')) ? response.name.replace(new RegExp('Id$'), '').toCamelCase() : undefined, // set relationship field
                        avoidConstraint: true,
                        // TODO, ajustar a nueva estructura de pivot
                        /* pivot          : response.relationship.pivot?.aggregate ? {
                            aggregate : response.relationship.pivot.aggregate,
                            modulePath: response.relationship.pivot.modulePath,
                        } : undefined, */
                    }) : undefined,
            index : response.index,
            schema: generateCommandState.schema,
        });
    },

    async promptAddPipeline(scope: string): Promise<{ from: string; to: string; service: string;}>
    {
        const questions = [];
        let platform = '';

        questions.push({
            name   : 'from',
            message: 'From which platform will you deploy?',
            type   : 'list',
            choices: cliterConfig.platformFromDeploy,
        });

        questions.push({
            name    : 'to',
            message : 'to which platform will it be deployed?',
            type    : 'list',
            choices : cliterConfig.platformToDeploy,
            validate: (input: string) =>
            {
                platform = input;
                return true;
            },
        });

        questions.push({
            name   : 'service',
            message: 'on what service will you deploy?',
            type   : 'list',
            choices: (answers: any) => scope === 'front' ?
                cliterConfig.serviceToDeploy.front[answers.to.toCamelCase()] :
                cliterConfig.serviceToDeploy.back[answers.to.toCamelCase()],
        });

        return inquirer.prompt(questions);
    },

    async promptAddPackage(scope: string): Promise<{ from: string; to: string; service: string;}>
    {
        const questions = [];
        questions.push(
            {
                name   : 'packageName',
                message: 'Select the package to install',
                type   : 'list',
                choices: Scope.FRONT === scope ?
                    cliterConfig.frontPackages :
                    cliterConfig.backPackages,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate: (packageName: string) => true,
            },
        );

        return inquirer.prompt(questions);
    },

    printValueObjectsTable(command: Command, items: Property[]): void
    {
        const headers: string[] = [];
        const excludeHeaders: Set<string> = new Set(['config', 'id']);
        const aliases: {origin: string; alias: string}[] = [
            { origin: '_name',                        alias: 'Name' },
            { origin: 'type',                         alias: 'Type' },
            { origin: 'primaryKey',                   alias: 'PK' },
            { origin: 'enumOptions',                  alias: 'Enums' },
            { origin: 'decimals',                     alias: 'Decimals' },
            { origin: 'length',                       alias: 'Length' },
            { origin: 'minLength',                    alias: 'MinL.' },
            { origin: 'maxLength',                    alias: 'MaxL.' },
            { origin: 'nullable',                     alias: 'Nullable' },
            { origin: 'relationship',                 alias: 'Relationship Type' },
            { origin: 'index',                        alias: 'Index' },
        ];
        const rows: any[] = [];

        // set headers
        for (const item of items)
        {
            for (const key in item)
            {
                if (item[key])
                {
                    const alias = aliases.find(alias => alias.origin === key);
                    if (
                        !headers.includes(alias ? alias.alias : key) &&
                        !excludeHeaders.has(key)
                    )
                    {
                        headers.push(alias ? alias.alias : key);
                    }
                }
            }
        }

        // set rows in headers order
        for (const item of items)
        {
            const row: any[] = [];
            for (const header of headers)
            {
                const alias = aliases.find(alias => alias.alias === header);

                // get value for each header
                let value = '';
                if (header === 'Decimals' && Array.isArray(item.decimals))
                {
                    value = item.decimals.join(',');
                }
                else if (alias?.origin === 'relationship')
                {
                    value = item.relationship?.type ? item.relationship.type : '';
                }
                else if (item[alias ? alias.origin : header])
                {
                    value = item[alias ? alias.origin : header];
                }

                row.push(value);
            }

            rows.push(row);
        }

        const table = new Table({
            head : headers,
            chars: { top: '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', bottom: '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', left: '║', 'left-mid': '╟', mid: '─', 'mid-mid': '┼', right: '║', 'right-mid': '╢', middle: '│' },
        });

        table.push(...rows);
        command.log(table.toString());
    },
};
