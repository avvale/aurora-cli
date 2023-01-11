// node
import * as path from 'node:path';

// imports
import { GenerateCommandState } from '../../types';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';

export const addReferences = (generateCommandState: GenerateCommandState): void =>
{
    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.applicationsContainer),
        cliterConfig.apiContainer,
        generateCommandState.schema.boundedContextName.toLowerCase(),
        generateCommandState.schema.moduleName.toLowerCase(),
        generateCommandState.schema.moduleNames.toLowerCase(),
        generateCommandState.schema.aggregateName,
    );
    codeWriter.generateBoundedContextBackReferences(generateCommandState.schema.properties);
    codeWriter.declareApplicationItemsInModule();
    codeWriter.declareBoundedContextModuleInApplicationModule();
    codeWriter.declareApplicationItemsExports();
    if (generateCommandState.schema.hasOAuth) codeWriter.declareAuthModuleInShareModule();
};
