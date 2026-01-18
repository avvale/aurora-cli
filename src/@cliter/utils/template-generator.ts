/* eslint-disable max-params */
import { Command } from '@oclif/core';
import * as chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { AdditionalApi, LockFile, Property, TemplateElement } from '../types';
import { excludeFiles } from './exclude-files.functions';
import { FileManager } from './file-manager';

export class TemplateGenerator {
    public static readonly templatePath: string = path.join(
        __dirname,
        '..',
        '..',
        'templates',
    );

    public static readonly projectDirectory: string = process.cwd();

    // generate static files from templates folder,
    // with templateElement know that type of element create, bounded_context, module, etc.
    // makes a wrapper of generateContents to centralize the content generation calls
    // from the template generator
    static async generateStaticContents(
        command: Command,
        templateElement: TemplateElement,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            additionalApi,
            force = false,
            verbose = false,
            excludedFiles = [],
            excludedOperations = [],
            lockFiles = [],
            templateData = {},
            currentProperty, // property to render value object or pivot table
            useTemplateEngine = true,
            templateElementPath,
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            additionalApi?: AdditionalApi;
            force?: boolean;
            verbose?: boolean;
            excludedFiles?: string[];
            excludedOperations?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
            currentProperty?: Property;
            useTemplateEngine?: boolean;
            templateElementPath?: string;
        } = {},
    ): Promise<void> {
        await FileManager.generateContents(
            command,
            path.join(
                TemplateGenerator.templatePath,
                ...templateElement.split('/'),
                templateElementPath || '',
            ),
            relativeTargetBasePath,
            relativeTargetPath,
            {
                boundedContextName,
                moduleName,
                moduleNames,
                additionalApi,
                force,
                verbose,
                excludedFiles,
                excludedOperations,
                lockFiles,
                templateData,
                currentProperty,
                useTemplateEngine,
            },
        );
    }

    static createDirectory(
        relativeTargetBasePath: string,
        directory: string,
    ): void {
        const modulePath = path.join(
            TemplateGenerator.projectDirectory,
            relativeTargetBasePath,
            directory,
        );

        if (!fs.existsSync(modulePath))
            fs.mkdirSync(modulePath, { recursive: true });
    }

    /**
     * @param {Command} command - command
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property[]} valueObjects Value objects
     * @param {string} moduleName Module name
     * @returns void
     */
    static generateValueObjects(
        command: Command,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        valueObjects: Property[],
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            force = false,
            verbose = false,
            excludedFiles = [],
            lockFiles = [],
            templateData = {},
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            force?: boolean;
            verbose?: boolean;
            excludedFiles?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
        } = {},
    ): void {
        if (!Array.isArray(valueObjects)) return;

        // iterate properties to generate ValueObjects
        for (const property of valueObjects) {
            TemplateGenerator.generateValueObject(
                command,
                relativeTargetBasePath,
                relativeTargetPath,
                property,
                {
                    boundedContextName,
                    moduleName,
                    moduleNames,
                    force,
                    verbose,
                    excludedFiles,
                    lockFiles,
                    templateData,
                },
            );
        }
    }

    /**
     * @param {Command} command - command
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property} property Property
     * @param {string} moduleName Module name
     * @return void
     */
    static async generateValueObject(
        command: Command,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        property: Property,
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            force = false,
            verbose = false,
            excludedFiles = [],
            lockFiles = [],
            templateData = {},
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            force?: boolean;
            verbose?: boolean;
            excludedFiles?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
        } = {},
    ): Promise<void> {
        // read value object from our data type
        const originFilePath = path.join(
            TemplateGenerator.templatePath,
            ...TemplateElement.BACK_VALUE_OBJECT.split('/'),
            property.type,
            '__bounded_context_name__-__module_name__-__property_name__.ts.hbs',
        );

        // get name of value object
        const nameReplaced = FileManager.replaceFilename(
            '__bounded_context_name__-__module_name__-__property_name__.ts.hbs',
            {
                boundedContextName,
                moduleName,
                moduleNames,
                currentProperty: property,
            },
        );

        // check if file to create is excluded in schema.
        // schema may not exist if is a new project from master,
        // when we have not yet created any bounded context or module
        if (
            !excludeFiles(excludedFiles).isAllowPath(
                path.join(
                    relativeTargetBasePath,
                    relativeTargetPath,
                    nameReplaced,
                ),
            )
        ) {
            command.log(
                `%s ${path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)} excluded`,
                chalk.yellow.inverse.bold('[EXCLUDED]'),
            );
            return;
        }

        // check that exists value object template
        if (!fs.existsSync(originFilePath))
            throw new Error(
                'Value object not exist, must to create template ' +
                    originFilePath,
            );

        await FileManager.manageTemplateFile(
            command,
            originFilePath,
            '__bounded_context_name__-__module_name__-__property_name__.ts.hbs',
            path.join(
                relativeTargetBasePath,
                relativeTargetPath,
                moduleName,
                'domain',
                'value-objects',
            ),
            {
                moduleNameSuffix: property.isI18n ? 'i18n' : '',
                currentProperty: property,
                boundedContextName,
                moduleName,
                moduleNames,
                force,
                verbose,
                lockFiles,
                templateData,
            },
        );
    }

    /**
     * @param {Command} command - command
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property[]} types Type properties (e.g., enums)
     * @param {string} moduleName Module name
     * @returns void
     */
    static generateTypes(
        command: Command,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        types: Property[],
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            force = false,
            verbose = false,
            excludedFiles = [],
            lockFiles = [],
            templateData = {},
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            force?: boolean;
            verbose?: boolean;
            excludedFiles?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
        } = {},
    ): void {
        if (!Array.isArray(types)) return;

        // iterate properties to generate Types
        for (const property of types) {
            TemplateGenerator.generateType(
                command,
                relativeTargetBasePath,
                relativeTargetPath,
                property,
                {
                    boundedContextName,
                    moduleName,
                    moduleNames,
                    force,
                    verbose,
                    excludedFiles,
                    lockFiles,
                    templateData,
                },
            );
        }
    }

    /**
     * @param {Command} command - command
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property} property Property
     * @param {string} moduleName Module name
     * @return void
     */
    static async generateType(
        command: Command,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        property: Property,
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            force = false,
            verbose = false,
            excludedFiles = [],
            lockFiles = [],
            templateData = {},
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            force?: boolean;
            verbose?: boolean;
            excludedFiles?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
        } = {},
    ): Promise<void> {
        // read type template from our data type
        const originFilePath = path.join(
            TemplateGenerator.templatePath,
            ...TemplateElement.BACK_TYPE.split('/'),
            property.type,
            '__bounded_context_name__-__module_name__-__property_name__.enum.ts.hbs',
        );

        // get name of type file
        const nameReplaced = FileManager.replaceFilename(
            '__bounded_context_name__-__module_name__-__property_name__.enum.ts.hbs',
            {
                boundedContextName,
                moduleName,
                moduleNames,
                currentProperty: property,
            },
        );

        // check if file to create is excluded in schema.
        // schema may not exist if is a new project from master,
        // when we have not yet created any bounded context or module
        if (
            !excludeFiles(excludedFiles).isAllowPath(
                path.join(
                    relativeTargetBasePath,
                    relativeTargetPath,
                    nameReplaced,
                ),
            )
        ) {
            command.log(
                `%s ${path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)} excluded`,
                chalk.yellow.inverse.bold('[EXCLUDED]'),
            );
            return;
        }

        // check that exists type template
        if (!fs.existsSync(originFilePath))
            throw new Error(
                'Type template does not exist, must create template ' +
                    originFilePath,
            );

        await FileManager.manageTemplateFile(
            command,
            originFilePath,
            '__bounded_context_name__-__module_name__-__property_name__.enum.ts.hbs',
            path.join(
                relativeTargetBasePath,
                relativeTargetPath,
                moduleName,
                'domain',
                'types',
            ),
            {
                moduleNameSuffix: property.isI18n ? 'i18n' : '',
                currentProperty: property,
                boundedContextName,
                moduleName,
                moduleNames,
                force,
                verbose,
                lockFiles,
                templateData,
            },
        );
    }
}
