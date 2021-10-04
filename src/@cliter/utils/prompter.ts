import { Command } from '@oclif/command';
import { SqlRelationship, SqlType } from './../types';
import { Operations } from './operations';
import { Property } from './property';
import { cliterConfig } from './../config/cliter.config';
import { newCommandConfig } from './../config/new-command.config';
import { Properties } from './properties';
import * as inquirer from 'inquirer';
import * as Table from 'cli-table3';

export class Prompter
{
    static async promptForNewApplication()
    {
        const questions = [];

        questions.push({
            name   : 'branch',
            message: 'Choose with which branch do you want to create your application?',
            type   : 'list',
            choices: newCommandConfig.branches
        });

        return await inquirer.prompt(questions);
    }

    static async promptForGithubCredentials()
    {
        const questions = [];

        questions.push({
            name   : 'githubUsername',
            message: 'Type your github username',
            type   : 'input'
        });

        questions.push({
            name   : 'githubPassword',
            message: 'Type your github password',
            type   : 'password'
        });

        return await inquirer.prompt(questions);
    }

    static async promptForLoadModule(boundedContextName?: string, moduleName?: string)
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
            }
        });

        questions.push({
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
            }
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase(),
            moduleName        : response.moduleName.toKebabCase(),
        };
    }

    static async promptForLoadBoundedContext(boundedContextName?: string)
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
            }
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase()
        };
    }

    static async promptForGenerateModule(boundedContextName?: string, moduleName?: string)
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
            }
        });

        questions.push({
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
            }
        });

        questions.push({
            name   : 'moduleNames',
            message: 'Input the plural of the module name in kebab case format',
            type   : 'input',
        });

        questions.push({
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
            hasTenant         : response.hasOAuth,
        };
    }

    static async promptForGenerateAggregate()
    {
        const questions = [];

        questions.push({
            name   : 'hasValueObject',
            message: 'Do you want to define a property?',
            type   : 'confirm'
        });

        return await inquirer.prompt(questions);
    }

    static async promptSelectOriginToCompare(files: string[])
    {
        const questions = [];

        questions.push({
            name   : 'fileToCompare',
            message: 'Select file to compare',
            type   : 'list',
            choices: files
        });

        return await inquirer.prompt(questions);
    }

    static async promptSelectCompareAction()
    {
        const questions = [];

        questions.push({
            name   : 'compareAction',
            message: 'Select an action',
            type   : 'list',
            choices: Object.values(cliterConfig.compareActions)
        });

        return await inquirer.prompt(questions);
    }

    static async promptForCompareOriginFile()
    {
        const questions = [];

        questions.push({
            name   : 'hasCompareOriginFile',
            message: 'Do you want compare any origin file?',
            type   : 'confirm'
        });

        return await inquirer.prompt(questions);
    }

    static async promptForSeedModule(boundedContextName?: string, moduleName?: string)
    {
        const questions = [];

        questions.push({
            name   : 'boundedContextName',
            message: 'Input the name of bonded context where is the module to run seed',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (boundedContextName)
                {
                    answers.boundedContextName = boundedContextName;
                    return false;
                }
                return true;
            }
        });

        questions.push({
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
            }
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase(),
            moduleName        : response.moduleName.toKebabCase(),
        };
    }

    static async promptForSeedBoundedContext(boundedContextName?: string)
    {
        const questions = [];

        questions.push({
            name   : 'boundedContextName',
            message: 'Input the name of bonded context where are the modules for run seeds',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (boundedContextName)
                {
                    answers.boundedContextName = boundedContextName;
                    return false;
                }
                return true;
            }
        });

        const response = await inquirer.prompt(questions);

        return {
            boundedContextName: response.boundedContextName.toKebabCase()
        };
    }

    static async promptDefineAggregateProperty(command: Command, boundedContextName: string, moduleName: string, moduleNames: string): Promise<Property>
    {
        const questions     = [];
        let name    = '';

        questions.push({
            name    : 'name',
            message : 'What\'s the name of property (type in snake case)',
            type    : 'input',
            validate: (input: string, answers: any) =>
            {
                name = input;
                return true;
            }
        });

        // only if filed end with _id
        questions.push({
            name   : 'relationship',
            message: 'What kind of relationship do you want to create?',
            type   : 'list',
            choices: Object.values(SqlRelationship).filter(item => ['none', 'one-to-one', 'many-to-one'].includes(item)),
            when   : (answers: any) =>
            {
                if (answers.name.endsWith('_id'))
                {
                    answers.type = 'id';
                    answers.length = 36;
                    return true;
                }
                return false;
            }
        });

        questions.push({
            name   : 'type',
            message: 'What\'s the type of property?',
            type   : 'list',
            choices: Object.values(SqlType),
            when   : (answers: any) => !answers.type
        });

        questions.push({
            name   : 'enumOptions',
            message: 'Set comma separated enumeration options, example: ONE,TWO,THREE,FOUR',
            type   : 'input',
            when   : (answers: any) => answers.type === SqlType.ENUM
        });

        questions.push({
            name   : 'relationship',
            message: 'What kind of relationship do you want to create?',
            type   : 'list',
            choices: Object.values(SqlRelationship).filter(item => !['many-to-one'].includes(item)),
            when   : (answers: any) => answers.type === SqlType.RELATIONSHIP
        });

        questions.push({
            name   : 'relationshipSingularName',
            message: 'The property name will be plural, type its singular',
            type   : 'input',
            when   : (answers: any) => answers.relationship === SqlRelationship.ONE_TO_MANY || answers.relationship === SqlRelationship.MANY_TO_MANY
        });

        questions.push({
            name   : 'relationshipAggregate',
            message: 'What is the aggregate which you want to relate this property? (example: AdminLang)',
            type   : 'input',
            when   : (answers: any) => answers.relationship === SqlRelationship.ONE_TO_ONE || answers.relationship === SqlRelationship.MANY_TO_ONE || answers.relationship === SqlRelationship.ONE_TO_MANY || answers.relationship === SqlRelationship.MANY_TO_MANY
        });

        questions.push({
            name   : 'relationshipModulePath',
            message: 'Type path to module where to find the aggregate with which you want to relate this property? Type with format: bounded-context/module',
            type   : 'input',
            when   : (answers: any) =>
            {
                if (answers.relationship === SqlRelationship.ONE_TO_MANY || (answers.relationship === SqlRelationship.ONE_TO_ONE && !answers.name.endsWith('_id'))) answers.type =  answers.relationshipAggregate;
                if (answers.relationship === SqlRelationship.ONE_TO_ONE && answers.name.endsWith('_id'))
                {
                    answers.type = 'id';
                    answers.length = 36;
                }

                // by default all many to many relationship will be nullable
                if (answers.relationship === SqlRelationship.MANY_TO_MANY) answers.nullable =  true;

                return answers.relationship === SqlRelationship.ONE_TO_ONE || answers.relationship === SqlRelationship.MANY_TO_ONE || answers.relationship === SqlRelationship.ONE_TO_MANY || answers.relationship === SqlRelationship.MANY_TO_MANY;
            }
        });

        questions.push({
            name   : 'hasIntermediateTable',
            message: () => `You want to create the intermediate table of your many to many relationship with name: ${boundedContextName.toSnakeCase()}_${moduleNames.toSnakeCase()}_${name.toSnakeCase()}?`,
            type   : 'confirm',
            when   : (answers: any) =>
            {
                return answers.relationship === SqlRelationship.MANY_TO_MANY;
            }
        });

        questions.push({
            name   : 'decimals',
            message: 'Set total digits and decimals comma separated, example: 10,2',
            type   : 'input',
            when   : (answers: any) => answers.type === SqlType.DECIMAL,
            filter : (answers: string) => answers.split(',').map(item => parseInt(item.trim()))
        });

        questions.push({
            name   : 'length',
            message: 'What\'s the length of property? Push enter to use the default length',
            type   : 'number',
            when   : (answers: any) =>
            {
                // avoid length for decimal values
                if (answers.type === SqlType.DECIMAL || answers.type === SqlType.FLOAT) return false;

                // set intermediateTable value
                if (answers.hasIntermediateTable) answers.intermediateTable = `${boundedContextName.toSnakeCase()}_${moduleNames.toSnakeCase()}_${name.toSnakeCase()}`;

                // set intermediateModel value
                if (answers.hasIntermediateTable)
                {
                    answers.intermediateModel               = `${boundedContextName.toPascalCase()}${moduleNames.toPascalCase()}${name.toPascalCase()}Model`;
                    answers.intermediateModelModuleSection  = `${boundedContextName}/${moduleName}`;
                    answers.intermediateModelFile           = `${moduleNames.toKebabCase()}-${name.toKebabCase()}`;
                }
                if (!answers.hasIntermediateTable && answers.relationship === SqlRelationship.MANY_TO_MANY)
                {
                    const relationshipModulePath            = Operations.parseFlagOfBoundedContextAndModule(command, answers.relationshipModulePath);
                    answers.intermediateModel               = `${relationshipModulePath.boundedContextName.toPascalCase()}${name.toPascalCase()}${moduleNames.toPascalCase()}Model`;
                    answers.intermediateModelModuleSection  = answers.relationshipModulePath;
                    answers.intermediateModelFile           = `${name.toKebabCase()}-${moduleNames.toKebabCase()}`;
                }

                if (answers.relationship || answers.relationship) return false;
                return Object.keys(cliterConfig.defaultTypeLength).includes(answers.type) && !answers.length;
            }
        });

        questions.push({
            name   : 'nullable',
            message: 'This property will be nullable?',
            type   : 'confirm',
            when   : (answers: any) =>
            {
                if (answers.relationship === SqlRelationship.ONE_TO_MANY)
                {
                    // a field with relation one-to-many always will be nullable
                    answers.nullable = true;
                    return false;
                }
                if (answers.relationship === SqlRelationship.MANY_TO_MANY)
                {
                    // answers.nullable = true;
                    return false;
                }
                return true;
            }
        });

        const response = await inquirer.prompt(questions);

        // add default length
        if (Object.keys(cliterConfig.defaultTypeLength).includes(response.type) && !response.length) response.length = cliterConfig.defaultTypeLength[response.type];

        // delete relationship none value
        if (response.relationship === SqlRelationship.NONE) delete response.relationship;

        return new Property({
            name                          : response.name,
            type                          : response.type,
            primaryKey                    : response.name === 'id' ? true : undefined, // by default if field name is id will be primary key
            enumOptions                   : response.enumOptions,
            decimals                      : response.decimals,
            length                        : response.length,
            minLength                     : response.minLength,
            maxLength                     : response.maxLength,
            nullable                      : response.nullable,
            defaultValue                  : response.defaultValue,
            relationship                  : response.relationship,
            relationshipSingularName      : response.relationshipSingularName,
            relationshipAggregate         : response.relationshipAggregate,
            relationshipModulePath        : response.relationshipModulePath,
            relationshipKey               : response.relationship === SqlRelationship.MANY_TO_ONE ? 'id' : undefined, // set default relationship key to id
            relationshipField             : response.relationship === SqlRelationship.MANY_TO_ONE || (response.relationship === SqlRelationship.ONE_TO_ONE && response.name.endsWith('_id')) ? response.name.replace(new RegExp('_id$'), '').toCamelCase() : undefined, // set relationship field
            intermediateTable             : response.intermediateTable,
            intermediateModel             : response.intermediateModel,
            intermediateModelModuleSection: response.intermediateModelModuleSection,
            intermediateModelFile         : response.intermediateModelFile,
            index                         : response.index
        });
    }

    static printValueObjectsTable(command: Command, items: Properties)
    {
        const headers: string[] = [];
        const excludeHeaders: string[] = ['config', 'id', 'intermediateModel', 'intermediateModelModuleSection', 'intermediateModelFile'];
        const aliases: {origin: string; alias: string}[] = [
            { origin: '_name',                       alias: 'Name' },
            { origin: 'type',                        alias: 'Type' },
            { origin: 'primaryKey',                  alias: 'PK' },
            { origin: 'enumOptions',                 alias: 'Enums' },
            { origin: 'decimals',                    alias: 'Decimals' },
            { origin: 'length',                      alias: 'Length' },
            { origin: 'minLength',                   alias: 'MinL.' },
            { origin: 'maxLength',                   alias: 'MaxL.' },
            { origin: 'nullable',                    alias: 'Nullable' },
            { origin: 'relationship',                alias: 'SqlRelationship' },
            { origin: 'relationshipSingularName',    alias: 'Singular' },
            { origin: 'relationshipAggregate',       alias: 'R. Aggregate' },
            { origin: 'relationshipModulePath',      alias: 'R. Module Path' },
            { origin: 'relationshipKey',             alias: 'R. Key' },
            { origin: 'relationshipField',           alias: 'R. Field' },
            { origin: 'intermediateTable',           alias: 'Intermediate Table' },
            { origin: 'index',                       alias: 'Index' },
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
                    if (!headers.includes(alias ? alias.alias : key) && !excludeHeaders.includes(key)) headers.push(alias ? alias.alias : key);
                }
            }
        }

        // set rows in headers order
        for (const item of items)
        {
            const row: any[] = [];
            for (const header of headers)
            {
                const alias =   aliases.find(alias => alias.alias === header);

                // get value for each header
                const value =   header === 'Decimals' && Array.isArray(item['decimals']) ?
                    item['decimals'].join() :
                    item[alias ?
                        alias.origin :
                        header
                    ] ?
                        item[
                            alias ?
                                alias.origin :
                                header
                        ] : '';

                row.push(value);
            }
            rows.push(row);
        }

        const table = new Table({
            head : headers,
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        });

        table.push(...rows);
        command.log(table.toString());
    }
}