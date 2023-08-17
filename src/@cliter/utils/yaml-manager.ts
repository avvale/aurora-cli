import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { ModuleDefinitionSchema } from '../types';
import { cliterConfig } from '../config';

export class YamlManager
{
    public static loadYamlConfigFile(
        boundedContextName: string,
        moduleName: string,
    ): ModuleDefinitionSchema
    {
        const yamlPath = path.join(process.cwd(), 'cliter', boundedContextName.toKebabCase(), moduleName.toKebabCase() + cliterConfig.schemaDefinitionExtension);
        const yamlObj = yaml.load(fs.readFileSync(yamlPath, 'utf8')) as any;

        YamlManager.checkModuleDefinitionSchema(yamlObj);

        return yamlObj;
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
                aggregateProperties: schema.aggregateProperties
                    .filter(item => !item.isI18n)
                    // omit id, is a internal id field when create property with prompt
                    .map(item => _.omit(item, ['id'])),
                aggregateI18nProperties: schema.aggregateProperties
                    .filter(item => item.isI18n)
                    // omit id, is a internal id field when create property with prompt
                    // omit isI18n, is not necessary because it is inside the array aggregateI18nProperties
                    .map(item => _.omit(item, ['id', 'isI18n'])),
                additionalApis: schema.additionalApis?.map(item => _.omit(item, ['pathSegments', 'pathBoundedContext', 'pathAction'])),
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

export const loadYamlByBoundedContextModule = (boundedContextModule: string): ModuleDefinitionSchema =>
{
    const [boundedContextName, moduleName] = boundedContextModule.split('/');
    if (!boundedContextName || !moduleName) throw new Error('Must input bounded context and module name, with format: bounded-context/module');

    return YamlManager.loadYamlConfigFile(boundedContextName, moduleName);
};
