/* eslint-disable max-params */
import { Command } from '@oclif/core';
import { GenerateCommandState, LockFile, TemplateElement } from '../types';
import { FileManager } from './file-manager';
import { AdditionalApi } from './additional-api';
import { Property } from './property';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class TemplateGenerator
{
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
    static generateStaticContents(
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
            excludeFiles = [],
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
            excludeFiles?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
            currentProperty?: Property;
            useTemplateEngine?: boolean;
            templateElementPath?: string;
        } = {},
    ): void
    {
        FileManager.generateContents(
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
                excludeFiles,
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
    ): void
    {
        const modulePath = path.join(TemplateGenerator.projectDirectory, relativeTargetBasePath, directory);

        if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath, { recursive: true });
    }

    /**
     * @param {GenerateCommandState} generateCommandState Generate command state
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property[]} valueObjects Value objects
     * @param {string} moduleName Module name
     * @returns void
     */
    static generateValueObjects(
        generateCommandState: GenerateCommandState,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        valueObjects: Property[],
        moduleName: string,
    ): void
    {
        // iterate properties to generate ValueObjects
        for (const property of valueObjects)
        {
            TemplateGenerator.generateValueObject(
                generateCommandState,
                relativeTargetBasePath,
                relativeTargetPath,
                property,
                moduleName,
            );
        }
    }

    /**
     * @param {GenerateCommandState} generateCommandState Generate command state
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property} property Property
     * @param {string} moduleName Module name
     * @return void
     */
    static generateValueObject(
        generateCommandState: GenerateCommandState,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        property: Property,
        moduleName: string,
    ): void
    {
        // read value object from our data type
        const originFilePath = path.join(
            TemplateGenerator.templatePath,
            ...TemplateElement.BACK_VALUE_OBJECT.split('/'),
            property.type,
            '__bounded_context_name__-__module_name__-__property_name__.ts',
        );

        // TODO, throw error when no exist value object
        // check that exists value object template
        if (!fs.existsSync(originFilePath)) return;

        FileManager.manageFileTemplate(
            generateCommandState.command,
            originFilePath,
            '__bounded_context_name__-__module_name__-__property_name__.ts',
            path.join(relativeTargetBasePath, relativeTargetPath, moduleName, 'domain', 'value-objects'),
            {
                force             : generateCommandState.flags.force,
                verbose           : generateCommandState.flags.verbose,
                templateData      : { ...generateCommandState },
                moduleNameSuffix  : property.isI18n ? 'i18n' : '',
                currentProperty   : property,
                boundedContextName: generateCommandState.schema.boundedContextName,
                moduleName        : generateCommandState.schema.moduleName,
                moduleNames       : generateCommandState.schema.moduleNames,
                lockFiles         : generateCommandState.lockFiles,
            },
        );
    }
}
