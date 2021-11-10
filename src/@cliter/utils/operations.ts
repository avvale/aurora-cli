import 'reflect-metadata';
import { container } from 'tsyringe';
import { Command } from '@oclif/command';
import { StateService } from './../services/state.service';
import { TemplateElement } from './../types';
import { TemplateGenerator } from './../utils/template-generator';
import { CodeWriter } from './code-writer';
import { cliterConfig } from './../config/cliter.config';
import * as child from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

export class Operations
{
    public static readonly stateService = container.resolve(StateService);

    async generateApplication()
    {
        // create directory for application
        if (!fs.existsSync(Operations.stateService.appName)) fs.mkdirSync(Operations.stateService.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.APPLICATION, path.join(Operations.stateService.appName), '.');
    }

    async generatePackage()
    {
        if (!Operations.stateService.packageName) throw new Error('To create package is requires package name');

        // create directory for application
        if (!fs.existsSync(Operations.stateService.packageName || '')) fs.mkdirSync(Operations.stateService.packageName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.PACKAGE, path.join(Operations.stateService.packageName), '.');
    }

    async generateModule()
    {
        // generate module files
        await this.generateModuleFiles();

        // generate intermediate tables
        await this.generateIntermediateTables();

        // generate framework files
        await this.generateFrameworkFiles();

        // create references, write imports in ts files
        this.createReferences();

        // flag to generate e2e tests, this test can overwrite custom tests
        if (Operations.stateService.flags.tests)
        {
            // generate testing files
            await this.generateTestingFiles();
        }

        // generate postman files
        await this.generatePostmanFiles();

        // create yaml file
        this.createYamlConfigFile();

        this.createJsonLockFile();
    }

    async generateModuleFiles(): Promise<void>
    {
        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
        );
        await TemplateGenerator.generateStaticContents(
            TemplateElement.MODULE, path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
        );
        await TemplateGenerator.generateValueObjects(
            path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
        );
    }

    async generateIntermediateTables()
    {
        await TemplateGenerator.generateIntermediateTables(path.join('src', cliterConfig.applicationsContainer), Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase());
    }

    async generateFrameworkFiles()
    {
        await TemplateGenerator.createDirectory(path.join('src', cliterConfig.apiContainer), Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase());
        await TemplateGenerator.generateStaticContents(TemplateElement.FRAMEWORK, path.join('src', cliterConfig.apiContainer), Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase());
    }

    async generateTestingFiles()
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.TEST, path.join('test'), '');
        await this.createTestingForeignModuleImports();
    }

    async generatePostmanFiles()
    {
        await TemplateGenerator.createDirectory('', 'postman');
        await TemplateGenerator.generateStaticContents(TemplateElement.POSTMAN, '', 'postman');
    }

    async generateEnvFile()
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.ENV, '', Operations.stateService.appName);
    }

    async generateGraphqlTypes()
    {
        // graphql
        return new Promise((resolve, reject) =>
        {
            child.exec('ts-node generate-typings', (err, stdout, stderr) =>
            {
                if (err)
                {
                    Operations.stateService.command.warn('Attention! we can\'t generate graphql entities');
                    Operations.stateService.command.error(`Error: ${err.message}`);
                    return;
                }
                Operations.stateService.command.log('GraphQL entities generated');

                resolve(stdout? stdout : stderr);
            });
        });
    }

    async createReferences()
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            Operations.stateService.schema.boundedContextName.toLowerCase(),
            Operations.stateService.schema.moduleName.toLowerCase(),
            Operations.stateService.schema.moduleNames.toLowerCase()
        );
        codeWriter.generateReferences(Operations.stateService.schema.properties);
        codeWriter.declareFramework();
        codeWriter.declareModule();
        if (Operations.stateService.schema.hasOAuth) codeWriter.declareAuthModuleInShareModule();
    }

    async createTestingForeignModuleImports()
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            Operations.stateService.schema.boundedContextName.toLowerCase(),
            Operations.stateService.schema.moduleName.toLowerCase(),
            Operations.stateService.schema.moduleNames.toLowerCase()
        );

        codeWriter.generateTestingForeignReferences(Operations.stateService.schema.properties);
    }

    createYamlConfigFile()
    {
        // write yaml file
        const yamlStr = yaml.dump(
            {
                version            : cliterConfig.configYamlVersion,
                boundedContextName : Operations.stateService.schema.boundedContextName,
                moduleName         : Operations.stateService.schema.moduleName,
                moduleNames        : Operations.stateService.schema.moduleNames,
                aggregateName      : Operations.stateService.schema.aggregateName,
                hasOAuth           : Operations.stateService.schema.hasOAuth,
                hasTenant          : Operations.stateService.schema.hasTenant,
                aggregateProperties: Operations.stateService.schema.properties.toDto().map(item => _.omit(item, ['id'])), // omit id, internal id when create property by prompt
                excluded           : Operations.stateService.schema.excluded,
            },
            {
                lineWidth  : -1,
                skipInvalid: true
            }
        );

        const yamlPath = path.join(process.cwd(), 'cliter', Operations.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(yamlPath)) fs.mkdirSync(yamlPath, { recursive: true });

        fs.writeFileSync(path.join(yamlPath, `${ Operations.stateService.schema.moduleName }.yml`), yamlStr, 'utf8');
    }

    createJsonLockFile()
    {
        const jsonPath = path.join(process.cwd(), 'cliter', Operations.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath, { recursive: true });

        const jsonLockFile = {
            version: cliterConfig.lockJsonVersion,
            files  : Operations.stateService.newLockFiles
        };

        fs.writeFileSync(path.join(jsonPath, `${ Operations.stateService.schema.moduleName }-lock.json`), JSON.stringify(jsonLockFile, null, 4), 'utf8');
    }

    static parseFlagOfBoundedContextAndModule(command: Command, module: string): { boundedContextName: string; moduleName: string }
    {
        const boundedContextSection = module.split('/');
        if (boundedContextSection.length !== 2) command.error('Must input bounded context and module name, with format: bounded-context/module');

        return {
            boundedContextName: boundedContextSection[0],
            moduleName        : boundedContextSection[1],
        };
    }
}