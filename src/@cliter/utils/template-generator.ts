import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { container } from 'tsyringe';
import { TemplateElement } from './../types';
import { StateService } from '../services/state.service';
import { FileManager } from './file-manager';

export class TemplateGenerator
{
    public static readonly templatePath: string = path.join(__dirname, '../..', 'templates');
    public static readonly projectDirectory: string = process.cwd();
    public static readonly stateService = container.resolve(StateService);

    // generate static files from templates folder, with templateElement know that type of element create, bounded_context, module, etc.
    static generateStaticContents(
        templateElement: TemplateElement,
        relativeTargetBasePath: string,
        relativeTargetPath: string
    ): void
    {
        FileManager.generateContents(
            path.join(TemplateGenerator.templatePath, templateElement),
            relativeTargetBasePath,
            relativeTargetPath,
        );
    }

    static generateIntermediateTables(relativeTargetBasePath: string, relativeTargetPath: string)
    {
        for (const property of TemplateGenerator.stateService.schema.properties.withRelationshipIntermediateTable)
        {
            // set current property for template
            TemplateGenerator.stateService.currentProperty = property;

            FileManager.generateContents(
                path.join(TemplateGenerator.templatePath, 'intermediate_table'),
                relativeTargetBasePath,
                relativeTargetPath,
            );
        }
    }

    static createDirectory(relativeTargetBasePath: string, directory: string)
    {
        const modulePath = path.join(TemplateGenerator.projectDirectory, relativeTargetBasePath, directory);

        if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath, { recursive: true });
    }

    static generateValueObjects(relativeTargetBasePath: string, relativeTargetPath: string)
    {
        for (const property of TemplateGenerator.stateService.schema.properties.valueObjects)
        {
            // set property to be used in manageFileTemplate
            TemplateGenerator.stateService.currentProperty = property;

            // read value object from our data type
            const originFilePath = path.join(TemplateGenerator.templatePath, 'value-object', property.type, '__module_name__-__property_name__.ts');

            // TODO,throw error when no exist value object
            // check that exists value object template
            if (!fs.existsSync(originFilePath)) return;

            FileManager.manageFileTemplate(
                originFilePath,
                '__module_name__-__property_name__.ts',
                path.join(relativeTargetBasePath, relativeTargetPath, TemplateGenerator.stateService.schema.moduleName, 'domain', 'value-objects')
            );
        }
    }
}