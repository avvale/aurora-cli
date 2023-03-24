import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import { Property } from './property';
import { ModuleDefinitionSchema } from '../types';
import { Properties } from './properties';
import { AdditionalApi } from './additional-api';
import { AdditionalApis } from './additional-apis';
import { cliterConfig } from '../config';

export class YamlManager
{
    public static loadYamlConfigFile(
        boundedContextName: string,
        moduleName: string,
    ): ModuleDefinitionSchema
    {
        const yamlPath = path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase(), moduleName.toKebabCase() + cliterConfig.schemaDefinitionExtension);

        // read yaml file
        const yamlObj = yaml.load(fs.readFileSync(yamlPath, 'utf8')) as any;

        YamlManager.parseModuleDefinitionSchema(yamlObj);

        const properties     = new Properties();
        const additionalApis = new AdditionalApis();
        const schema: ModuleDefinitionSchema = {
            boundedContextName: yamlObj.boundedContextName,
            moduleName        : yamlObj.moduleName,
            moduleNames       : yamlObj.moduleNames,
            aggregateName     : yamlObj.aggregateName,
            hasOAuth          : yamlObj.hasOAuth,
            hasTenant         : yamlObj.hasTenant,
            hasAuditing       : yamlObj.hasAuditing,
            properties,
            additionalApis,
            excluded          : yamlObj.excluded,
        };

        // reference schema in properties
        properties.schema = schema;

        for (const property of yamlObj.aggregateProperties)
        {
            properties.add(
                new Property({
                    name                       : property.name,
                    type                       : property.type,
                    primaryKey                 : property?.primaryKey,
                    autoIncrement              : property?.autoIncrement,
                    enumOptions                : property?.enumOptions?.join(),
                    decimals                   : property?.decimals,
                    length                     : property?.length,
                    minLength                  : property?.minLength,
                    maxLength                  : property?.maxLength,
                    nullable                   : property?.nullable,
                    defaultValue               : property?.defaultValue,
                    relationship               : property?.relationship,
                    relationshipSingularName   : property?.relationshipSingularName,
                    relationshipAggregate      : property?.relationshipAggregate,
                    relationshipModulePath     : property?.relationshipModulePath,
                    relationshipKey            : property?.relationshipKey,
                    relationshipField          : property?.relationshipField,
                    relationshipAvoidConstraint: property?.relationshipAvoidConstraint,
                    relationshipPackageName    : property?.relationshipPackageName,
                    pivotAggregateName         : property?.pivotAggregateName,
                    pivotPath                  : property?.pivotPath,
                    pivotFileName              : property?.pivotFileName,
                    isDenormalized             : property?.isDenormalized,
                    index                      : property?.index,
                    indexName                  : property?.indexName,
                    isI18n                     : property?.isI18n,
                    example                    : property?.example,
                    faker                      : property?.faker,
                    webComponent               : property?.webComponent,
                    schema,
                }),
            );
        }

        if (Array.isArray(yamlObj.additionalApis))
        {
            for (const additionalApi of yamlObj.additionalApis)
            {
                additionalApis.add(
                    new AdditionalApi({
                        path        : additionalApi.path,
                        resolverType: additionalApi.resolverType,
                        httpMethod  : additionalApi.httpMethod,
                    }),
                );
            }
        }

        return schema;
    }

    private static parseModuleDefinitionSchema(yamlObj: any): void
    {
        if (typeof yamlObj.boundedContextName !== 'string')     throw new Error('Yaml file structure error, boundedContextName field missing');
        if (typeof yamlObj.moduleName !== 'string')             throw new Error('Yaml file structure error, moduleName field missing');
        if (typeof yamlObj.moduleNames !== 'string')            throw new Error('Yaml file structure error, moduleNames field missing');
        if (typeof yamlObj.aggregateName !== 'string')          throw new Error('Yaml file structure error, aggregateName field missing');
        if (typeof yamlObj.hasOAuth !== 'boolean')              throw new Error('Yaml file structure error, hasOAuth field missing');
        if (typeof yamlObj.hasTenant !== 'boolean')             throw new Error('Yaml file structure error, hasTenant field missing');
        if (typeof yamlObj.hasAuditing !== 'boolean')           throw new Error('Yaml file structure error, hasAuditing field missing in ' + yamlObj.aggregateName);
    }
}
