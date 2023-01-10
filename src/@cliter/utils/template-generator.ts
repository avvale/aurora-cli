// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import * as fs from 'node:fs';
import * as path from 'node:path';
import { TemplateElement } from '../types';
import { StateService } from '../functions/state.service';
import { FileManager } from './file-manager';
import { Property } from './property';

export class TemplateGenerator
{
    public static readonly templatePath: string = path.join(__dirname, '..', '..', 'templates');
    public static readonly projectDirectory: string = process.cwd();
    public static readonly stateService = container.resolve(StateService);

    // generate static files from templates folder, with templateElement know that type of element create, bounded_context, module, etc.
    static generateStaticContents(
        templateElement: TemplateElement,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        {
            templateElementPath,
            useTemplateEngine = true,
        }: {
            templateElementPath?: string;
            useTemplateEngine?: boolean;
        } = {},
    ): void
    {
        FileManager.generateContents(
            path.join(TemplateGenerator.templatePath, ...templateElement.split('/'), templateElementPath || ''),
            relativeTargetBasePath,
            relativeTargetPath,
            { useTemplateEngine },
        );
    }

    static generatePivotTables(
        relativeTargetBasePath: string,
        relativeTargetPath: string,
    ): void
    {
        for (const property of TemplateGenerator.stateService.schema.properties.withRelationshipManyToMany)
        {
            // only create table if has in pivotPath
            if (property.pivotPath === `${TemplateGenerator.stateService.schema.boundedContextName}/${TemplateGenerator.stateService.schema.moduleName}`)
            {
                FileManager.generateContents(
                    path.join(TemplateGenerator.templatePath,  ...TemplateElement.BACK_PIVOT.split('/')),
                    relativeTargetBasePath,
                    relativeTargetPath,
                    { currentProperty: property },
                );
            }
        }
    }

    static createDirectory(
        relativeTargetBasePath: string,
        directory: string,
    ): void
    {
        const modulePath = path.join(TemplateGenerator.projectDirectory, relativeTargetBasePath, directory);

        if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath, { recursive: true });
    }

    static generateAdditionalApiFiles(
        relativeTargetBasePath: string,
        relativeTargetPath: string,
    ): void
    {
        for (const additionalApi of TemplateGenerator.stateService.schema.additionalApis)
        {
            // set additional api to create, to be available in template
            TemplateGenerator.stateService.currentAdditionalApi = additionalApi;

            // create module files
            TemplateGenerator.generateStaticContents(
                TemplateElement.BACK_ADDITIONAL_API,
                relativeTargetBasePath,
                relativeTargetPath,
            );
        }
    }

    /**
     *
     * @param {string} relativeTargetBasePath
     * @param {string} relativeTargetPath
     * @returns void
     */
    static generateValueObjects(
        relativeTargetBasePath: string,
        relativeTargetPath: string,
    ): void
    {
        // generate ValueObjects
        for (const property of TemplateGenerator.stateService.schema.properties.valueObjects)
        {
            TemplateGenerator.generateValueObject(
                relativeTargetBasePath,
                relativeTargetPath,
                property,
            );
        }
    }

    /*********************************
     *
     * @param {string} relativeTargetBasePath Relative target base path
     * @param {string} relativeTargetPath Relative target path
     * @param {Property} property Property
     * @return void
     */
    static generateValueObject(
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        property: Property,
    ): void
    {
        // read value object from our data type
        const originFilePath = path.join(TemplateGenerator.templatePath, ...TemplateElement.BACK_VALUE_OBJECT.split('/'), property.type, '__module_name__-__property_name__.ts');

        // TODO,throw error when no exist value object
        // check that exists value object template
        if (!fs.existsSync(originFilePath)) return;

        FileManager.manageFileTemplate(
            originFilePath,
            '__module_name__-__property_name__.ts',
            path.join(relativeTargetBasePath, relativeTargetPath, TemplateGenerator.stateService.schema.moduleName, 'domain', 'value-objects'),
            {
                moduleNameSuffix: property.isI18n ? 'i18n' : '',
                currentProperty : property,
            },
        );
    }
}
