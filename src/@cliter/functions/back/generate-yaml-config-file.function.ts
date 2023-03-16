import * as path from 'node:path';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { cliterConfig } from '../../config';
import { GenerateCommandState } from '../../types';

export const generateYamlConfigFile = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    // write yaml file
    const yamlStr = yaml.dump(
        {
            version            : cliterConfig.configYamlVersion,
            boundedContextName : generateCommandState.schema.boundedContextName,
            moduleName         : generateCommandState.schema.moduleName,
            moduleNames        : generateCommandState.schema.moduleNames,
            aggregateName      : generateCommandState.schema.aggregateName,
            hasOAuth           : generateCommandState.schema.hasOAuth,
            hasTenant          : generateCommandState.schema.hasTenant,
            hasAuditing        : generateCommandState.schema.hasAuditing,
            aggregateProperties: generateCommandState.schema.properties.toDto().map(item => _.omit(item, ['id'])), // omit id, internal id when create property by prompt
            additionalApis     : generateCommandState.schema.additionalApis.toDto().map(item => _.omit(item, ['pathSegments', 'pathBoundedContext', 'pathAction'])),
            excluded           : generateCommandState.schema.excluded,
        },
        {
            lineWidth  : -1,
            skipInvalid: true,
        },
    );

    const yamlPath = path.join(process.cwd(), 'cliter', generateCommandState.schema.boundedContextName.toKebabCase());

    if (!fs.existsSync(yamlPath)) fs.mkdirSync(yamlPath, { recursive: true });

    fs.writeFileSync(path.join(yamlPath, `${generateCommandState.schema.moduleName}${cliterConfig.schemaDefinitionExtension}`), yamlStr, 'utf8');
};
