// node
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers/back.handler';
import { cliterConfig } from '../../config';
import { CodeWriter } from '../../utils';

export const addReferences = (): void =>
{
    const codeWriter = new CodeWriter(
        path.join('src'),
        path.join(cliterConfig.applicationsContainer),
        cliterConfig.apiContainer,
        BackHandler.stateService.schema.boundedContextName.toLowerCase(),
        BackHandler.stateService.schema.moduleName.toLowerCase(),
        BackHandler.stateService.schema.moduleNames.toLowerCase(),
        BackHandler.stateService.schema.aggregateName,
    );
    codeWriter.generateBoundedContextBackReferences(BackHandler.stateService.schema.properties);
    codeWriter.declareApplicationItemsInModule();
    codeWriter.declareBoundedContextModuleInApplicationModule();
    codeWriter.declareApplicationItemsExports();
    if (BackHandler.stateService.schema.hasOAuth) codeWriter.declareAuthModuleInShareModule();
};
