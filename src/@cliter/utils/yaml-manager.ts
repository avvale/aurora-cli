import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
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

        YamlManager.checkModuleDefinitionSchema(yamlObj);

        const properties = new Properties();

        const schema: ModuleDefinitionSchema = {
            boundedContextName: yamlObj.boundedContextName,
            moduleName        : yamlObj.moduleName,
            moduleNames       : yamlObj.moduleNames,
            aggregateName     : yamlObj.aggregateName,
            hasOAuth          : yamlObj.hasOAuth,
            hasTenant         : yamlObj.hasTenant,
            hasAuditing       : yamlObj.hasAuditing,
            properties,
            additionalApis    : Array.isArray(yamlObj.additionalApis) ? createAdditionalApis(yamlObj.additionalApis) : undefined,
            excluded          : yamlObj.excluded,
        };

        // reference schema in properties
        properties.schema = schema;

        // add aggregate properties
        addProperties({
            properties,
            aggregateProperties: yamlObj.aggregateProperties,
            schema,
        });

        if (Array.isArray(yamlObj.aggregateI18nProperties))
        {
            // add aggregate i18n properties
            addProperties({
                properties,
                aggregateProperties: yamlObj.aggregateI18nProperties,
                schema,
            });
        }

        return schema;
    }

    public static generateYamlConfigFile(
        schema: ModuleDefinitionSchema,
    ): void
    {
        // write yaml file
        const yamlStr = yaml.dump(
            {
                version            : cliterConfig.configYamlVersion,
                boundedContextName : schema.boundedContextName,
                moduleName         : schema.moduleName,
                moduleNames        : schema.moduleNames,
                aggregateName      : schema.aggregateName,
                hasOAuth           : schema.hasOAuth,
                hasTenant          : schema.hasTenant,
                hasAuditing        : schema.hasAuditing,
                aggregateProperties: schema.properties
                    .toDto()
                    .filter(item => !item.isI18n)
                    // omit id, is a internal id field when create property with prompt
                    .map(item => _.omit(item, ['id'])),
                aggregateI18nProperties: schema.properties
                    .toDto()
                    .filter(item => item.isI18n)
                    // omit id, is a internal id field when create property with prompt
                    // omit isI18n, is not necessary because it is inside the array aggregateI18nProperties
                    .map(item => _.omit(item, ['id', 'isI18n'])),
                additionalApis: schema.additionalApis?.toDto().map(item => _.omit(item, ['pathSegments', 'pathBoundedContext', 'pathAction'])),
                excluded      : schema.excluded,
            },
            {
                lineWidth  : -1,
                skipInvalid: true,
            },
        );

        const yamlPath = path.join(process.cwd(), 'cliter', schema.boundedContextName.toKebabCase());

        if (!fs.existsSync(yamlPath)) fs.mkdirSync(yamlPath, { recursive: true });

        fs.writeFileSync(path.join(yamlPath, `${schema.moduleName}${cliterConfig.schemaDefinitionExtension}`), yamlStr, 'utf8');
    }

    private static checkModuleDefinitionSchema(yamlObj: any): void
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

const addProperties = (
    {
        properties,
        aggregateProperties = [],
        schema,
    }:
    {
        properties: Properties,
        aggregateProperties?: Property[];
        schema?: ModuleDefinitionSchema;
    },
): Properties =>
{
    for (const property of aggregateProperties)
    {
        properties.add(
            createProperty({
                property,
                schema,
            }),
        );
    }

    return properties;
};

const createProperty = (
    {
        isI18n,
        property = {},
        schema,
    }:
    {
        isI18n?: boolean;
        property?: any;
        schema?: ModuleDefinitionSchema;
    },
): Property =>
{
    return new Property({
        isI18n,
        name         : property.name,
        type         : property.type,
        primaryKey   : property?.primaryKey,
        autoIncrement: property?.autoIncrement,
        enumOptions  : property?.enumOptions?.join(),
        decimals     : property?.decimals,
        length       : property?.length,
        minLength    : property?.minLength,
        maxLength    : property?.maxLength,
        nullable     : property?.nullable,
        defaultValue : property?.defaultValue,
        relationship : property?.relationship,
        index        : property?.index,
        indexName    : property?.indexName,
        example      : property?.example,
        faker        : property?.faker,
        webComponent : property?.webComponent,
        schema,
    });
};

const createAdditionalApis = (additionalApis: any): AdditionalApis | undefined =>
{
    if (!Array.isArray(additionalApis)) return;

    const additionalApisObject = new AdditionalApis();

    for (const additionalApi of additionalApis)
    {
        additionalApisObject.add(
            new AdditionalApi({
                path        : additionalApi.path,
                resolverType: additionalApi.resolverType,
                httpMethod  : additionalApi.httpMethod,
            }),
        );
    }

    return additionalApisObject;
};
