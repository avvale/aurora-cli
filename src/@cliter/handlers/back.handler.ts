// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as child from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { StateService } from '../functions/state.service';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { CodeWriter } from '../utils/code-writer';
import { cliterConfig } from '../config/cliter.config';
import { generateAdditionalApiFiles, generateApiFiles, generateI18NApiFiles, generateI18nModuleFiles, generateModuleFiles, generatePivotTables } from '../functions/back';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

export class BackHandler
{
    public static readonly stateService = container.resolve(StateService);

    /**
     * Generate server application
     * @return {Promise<void>} void
     */
    static async generateApplication(): Promise<void>
    {
        if (!BackHandler.stateService.appName) throw new Error('To create application is required app name');

        // create directory for application
        if (!fs.existsSync(BackHandler.stateService.appName)) fs.mkdirSync(BackHandler.stateService.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_APPLICATION, path.join(BackHandler.stateService.appName), '.');
    }

    static async generateApplicationEnvFile(applicationName: string): Promise<void>
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_ENV, '', applicationName);
    }

    static async generateModule(): Promise<void>
    {
        // generate module files
        await generateModuleFiles();

        // generate pivot tables
        await generatePivotTables();

        // generate i18n module files
        await generateI18nModuleFiles();

        // generate @api files
        await generateApiFiles();

        // generate additional api filles
        await generateAdditionalApiFiles();

        // generate @api i18n files
        await generateI18NApiFiles();

        // create references, write imports in ts files
        BackHandler.createBackReferences();

        // flag to generate e2e tests, this test can overwrite custom tests
        if (BackHandler.stateService.flags.tests)
        {
            // generate testing files
            await BackHandler.generateTestingFiles();
        }

        // generate postman files
        await BackHandler.generatePostmanFiles();

        // create yaml file
        BackHandler.createYamlConfigFile();

        BackHandler.createJsonLockFile();
    }

    static async generateGraphqlTypes(): Promise<string>
    {
        // graphql
        return new Promise((resolve, reject) =>
        {
            // TODO pass to spawn
            child.exec('npm run graphql:types', (err, stdout, stderr) =>
            {
                if (err)
                {
                    BackHandler.stateService.command.warn(`Attention! we can't generate graphql entities.
It may refer to a relationship that has not yet been created. Use the --noGraphQLTypes or -g parameter to avoid creating GraphQL types.`);

                    if (BackHandler.stateService.flags.verbose)
                    {
                        BackHandler.stateService.command.error(`Error to generate-typings: ${err.message}`);
                    }
                    else
                    {
                        BackHandler.stateService.command.warn('Use the -v or --verbose parameter for more information.');
                    }

                    return;
                }

                BackHandler.stateService.command.log('GraphQL entities generated');

                resolve(stdout ? stdout : stderr);
            });
        });
    }

    static async generateModuleFiles(): Promise<void>
    {
        // create directory application container, normally src/@apps
        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.applicationsContainer),
            BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create module files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_MODULE,
            path.join('src', cliterConfig.applicationsContainer),
            BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create value objects in module folder
        await TemplateGenerator.generateValueObjects(
            path.join('src', cliterConfig.applicationsContainer),
            BackHandler.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );
    }

    static createBackReferences(): void
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            BackHandler.stateService.schema.boundedContextName.toLowerCase(),
            BackHandler.stateService.schema.moduleName.toLowerCase(),
            BackHandler.stateService.schema.moduleNames.toLowerCase(),
            BackHandler.stateService.schema.aggregateName,
        );
        codeWriter.generateBoundedContextBackReferences(BackHandler.stateService.schema.properties);
        codeWriter.declareApplicationItemsInModule();
        codeWriter.declareBoundedContextModuleInApplicationModule();
        codeWriter.declareApplicationItemsExports();
        if (BackHandler.stateService.schema.hasOAuth) codeWriter.declareAuthModuleInShareModule();
    }

    static async generateTestingFiles(): Promise<void>
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_TEST, path.join('test'), '');
        await BackHandler.createTestingForeignModuleImports();
    }

    static async createTestingForeignModuleImports(): Promise<void>
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            BackHandler.stateService.schema.boundedContextName.toLowerCase(),
            BackHandler.stateService.schema.moduleName.toLowerCase(),
            BackHandler.stateService.schema.moduleNames.toLowerCase(),
            BackHandler.stateService.schema.aggregateName,
        );

        codeWriter.generateTestingForeignReferences(BackHandler.stateService.schema.properties);
    }

    static async generatePostmanFiles(): Promise<void>
    {
        await TemplateGenerator.createDirectory('', 'postman');
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_POSTMAN, '', 'postman');
    }

    static createYamlConfigFile(): void
    {
        // write yaml file
        const yamlStr = yaml.dump(
            {
                version            : cliterConfig.configYamlVersion,
                boundedContextName : BackHandler.stateService.schema.boundedContextName,
                moduleName         : BackHandler.stateService.schema.moduleName,
                moduleNames        : BackHandler.stateService.schema.moduleNames,
                aggregateName      : BackHandler.stateService.schema.aggregateName,
                hasOAuth           : BackHandler.stateService.schema.hasOAuth,
                hasTenant          : BackHandler.stateService.schema.hasTenant,
                hasAuditing        : BackHandler.stateService.schema.hasAuditing,
                aggregateProperties: BackHandler.stateService.schema.properties.toDto().map(item => _.omit(item, ['id'])), // omit id, internal id when create property by prompt
                additionalApis     : BackHandler.stateService.schema.additionalApis.toDto().map(item => _.omit(item, ['pathSegments', 'pathBoundedContext', 'pathAction'])),
                excluded           : BackHandler.stateService.schema.excluded,
            },
            {
                lineWidth  : -1,
                skipInvalid: true,
            },
        );

        const yamlPath = path.join(process.cwd(), 'cliter', BackHandler.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(yamlPath)) fs.mkdirSync(yamlPath, { recursive: true });

        fs.writeFileSync(path.join(yamlPath, `${BackHandler.stateService.schema.moduleName}.yaml`), yamlStr, 'utf8');
    }

    static createJsonLockFile(): void
    {
        const jsonPath = path.join(process.cwd(), 'cliter', BackHandler.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath, { recursive: true });

        const jsonLockFile = {
            version: cliterConfig.lockJsonVersion,
            files  : BackHandler.stateService.newLockFiles,
        };

        fs.writeFileSync(path.join(jsonPath, `${BackHandler.stateService.schema.moduleName}-lock.json`), JSON.stringify(jsonLockFile, null, 4), 'utf8');
    }
}
