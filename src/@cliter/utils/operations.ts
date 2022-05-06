// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as child from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { Command } from '@oclif/core';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { StateService } from '../services/state.service';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { CodeWriter } from './code-writer';
import { cliterConfig } from '../config/cliter.config';

export class Operations
{
    public static readonly stateService = container.resolve(StateService);

    async generateApplication(): Promise<void>
    {
        if (!Operations.stateService.appName) throw new Error('To create application is required app name');

        // create directory for application
        if (!fs.existsSync(Operations.stateService.appName)) fs.mkdirSync(Operations.stateService.appName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_APPLICATION, path.join(Operations.stateService.appName), '.');
    }

    async generatePackage(): Promise<void>
    {
        if (!Operations.stateService.packageName) throw new Error('To create package is required package name');

        // create directory for application
        if (!fs.existsSync(Operations.stateService.packageName || '')) fs.mkdirSync(Operations.stateService.packageName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_PACKAGE, path.join(Operations.stateService.packageName), '.');
    }

    async generateDashboard(): Promise<void>
    {
        if (!Operations.stateService.dashboardName) throw new Error('To create dashboard is required dashboard name');

        // create directory for dashboard
        if (!fs.existsSync(Operations.stateService.dashboardName)) fs.mkdirSync(Operations.stateService.dashboardName, { recursive: true });

        await TemplateGenerator.generateStaticContents(TemplateElement.FRONT_APPLICATION, path.join(Operations.stateService.dashboardName), '.');
    }

    async generateFrontModule(): Promise<void>
    {
        // generate dashboard module translations empty
        await this.generateFrontTranslationsModule();

        // generate dashboard module files
        await this.generateFrontModuleFiles();

        // create references, write imports in ts files
        this.createFrontReferences();

        this.createJsonLockFile();
    }

    async generateFrontTranslationsModule(): Promise<void>
    {
        // create directory application container, normally src/assets/i18n/module_name
        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.dashboardTranslations),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create module translations
        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_MODULE_TRANSLATIONS,
            path.join('src', cliterConfig.dashboardTranslations),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );
    }

    async generateFrontModuleFiles(): Promise<void>
    {
        // create directory application container, normally src/app/modules/admin/apps
        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.dashboardContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create module files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_MODULE,
            path.join('src', cliterConfig.dashboardContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
        );
    }

    async generatePipeline(app: string, from: string, to: string, service: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.CI_CD,
            '.',
            '.',
            {
                templateElementPath: path.join(app, from.toKebabCase(), to.toKebabCase(), service.toKebabCase()),
            },
        );
    }

    async installBackPackage(packageName: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_PACKAGES,
            '.',
            '.',
            {
                templateElementPath: path.join(packageName.toKebabCase()),
            },
        );
    }

    async installFrontPackage(packageName: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_PACKAGES,
            '.',
            '.',
            {
                templateElementPath: path.join(packageName.toKebabCase()),
            },
        );
    }

    async generateBackModule(): Promise<void>
    {
        // generate module files
        await this.generateModuleFiles();

        // generate pivot tables
        await this.generatePivotTables();

        // generate i18n module files
        await this.generateI18NModuleFiles();

        // generate @api files
        await this.generateApiFiles();

        // generate @api i18n files
        await this.generateI18NApiFiles();

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
        // create directory application container, normally src/@apps
        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create module files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_MODULE,
            path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );

        // create value objects in module folder
        await TemplateGenerator.generateValueObjects(
            path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );
    }

    async generatePivotTables(): Promise<void>
    {
        await TemplateGenerator.generatePivotTables(
            path.join('src', cliterConfig.applicationsContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
        );
    }

    async generateI18NModuleFiles(): Promise<void>
    {
        if (Operations.stateService.schema.properties.hasI18n)
        {
            await TemplateGenerator.generateStaticContents(
                TemplateElement.BACK_I18N_MODULE,
                path.join('src', cliterConfig.applicationsContainer),
                Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase(),
            );
        }
    }

    async generateApiFiles(): Promise<void>
    {
        await TemplateGenerator.createDirectory(
            path.join('src', cliterConfig.apiContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
        );
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_API,
            path.join('src', cliterConfig.apiContainer),
            Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
        );
    }

    async generateI18NApiFiles(): Promise<void>
    {
        if (Operations.stateService.schema.properties.hasI18n)
        {
            await TemplateGenerator.generateStaticContents(
                TemplateElement.BACK_I18N_API,
                path.join('src', cliterConfig.apiContainer),
                Operations.stateService.schema.boundedContextName.toLowerCase().toKebabCase()
            );
        }
    }

    async generateTestingFiles(): Promise<void>
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_TEST, path.join('test'), '');
        await this.createTestingForeignModuleImports();
    }

    async generatePostmanFiles(): Promise<void>
    {
        await TemplateGenerator.createDirectory('', 'postman');
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_POSTMAN, '', 'postman');
    }

    async generateApplicationEnvFile(applicationName: string): Promise<void>
    {
        await TemplateGenerator.generateStaticContents(TemplateElement.BACK_ENV, '', applicationName);
    }

    async generateGraphqlTypes(): Promise<string>
    {
        // graphql
        return new Promise((resolve, reject) =>
        {
            child.exec('ts-node generate-typings', (err, stdout, stderr) =>
            {
                if (err)
                {
                    Operations.stateService.command.warn(`Attention! we can't generate graphql entities.
It may refer to a relationship that has not yet been created. Use the --noGraphQLTypes or -g parameter to avoid creating GraphQL types.`);

                    if (Operations.stateService.flags.verbose)
                    {
                        Operations.stateService.command.error(`Error: ${err.message}`);
                    }
                    else
                    {
                        Operations.stateService.command.warn('Use the -v or --verbose parameter for more information.');
                    }

                    return;
                }
                Operations.stateService.command.log('GraphQL entities generated');

                resolve(stdout ? stdout : stderr);
            });
        });
    }

    createFrontReferences(): void
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            Operations.stateService.schema.boundedContextName.toLowerCase(),
            Operations.stateService.schema.moduleName.toLowerCase(),
            Operations.stateService.schema.moduleNames.toLowerCase(),
            Operations.stateService.schema.aggregateName,
        );

        codeWriter.generateDashboardInterface(
            Operations.stateService.schema.properties,
            { overwrite: Operations.stateService.flags.overwriteInterface },
        );
        codeWriter.generateFrontRoutes();
        codeWriter.declareDashboardComponents();
        codeWriter.declareDashboardBoundedContext();
        codeWriter.generateDashboardMenu();
        codeWriter.generateDashboardTranslations(Operations.stateService.schema.properties, 'en');
        codeWriter.generateDashboardTranslations(Operations.stateService.schema.properties, 'es');
        codeWriter.generateDashboardMenuTranslation('en');
        codeWriter.generateDashboardMenuTranslation('es');
    }

    createReferences(): void
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            Operations.stateService.schema.boundedContextName.toLowerCase(),
            Operations.stateService.schema.moduleName.toLowerCase(),
            Operations.stateService.schema.moduleNames.toLowerCase(),
            Operations.stateService.schema.aggregateName,
        );
        codeWriter.generateBoundedContextBackReferences(Operations.stateService.schema.properties);
        codeWriter.declareApplicationItemsInModule();
        codeWriter.declareBoundedContextModuleInApplicationModule();
        codeWriter.declareApplicationItemsExports();
        if (Operations.stateService.schema.hasOAuth) codeWriter.declareAuthModuleInShareModule();
    }

    async createTestingForeignModuleImports(): Promise<void>
    {
        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.applicationsContainer),
            cliterConfig.apiContainer,
            Operations.stateService.schema.boundedContextName.toLowerCase(),
            Operations.stateService.schema.moduleName.toLowerCase(),
            Operations.stateService.schema.moduleNames.toLowerCase(),
            Operations.stateService.schema.aggregateName,
        );

        codeWriter.generateTestingForeignReferences(Operations.stateService.schema.properties);
    }

    createYamlConfigFile(): void
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
                skipInvalid: true,
            },
        );

        const yamlPath = path.join(process.cwd(), 'cliter', Operations.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(yamlPath)) fs.mkdirSync(yamlPath, { recursive: true });

        fs.writeFileSync(path.join(yamlPath, `${ Operations.stateService.schema.moduleName }.yaml`), yamlStr, 'utf8');
    }

    createJsonLockFile(): void
    {
        const jsonPath = path.join(process.cwd(), 'cliter', Operations.stateService.schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath, { recursive: true });

        const jsonLockFile = {
            version: cliterConfig.lockJsonVersion,
            files  : Operations.stateService.newLockFiles,
        };

        fs.writeFileSync(path.join(jsonPath, `${Operations.stateService.schema.moduleName}-lock.json`), JSON.stringify(jsonLockFile, null, 4), 'utf8');
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