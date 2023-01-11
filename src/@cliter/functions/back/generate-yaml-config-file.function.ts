// node
import * as path from 'node:path';
import * as fs from 'node:fs';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

export const generateYamlConfigFile = async (): Promise<void> =>
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
};
