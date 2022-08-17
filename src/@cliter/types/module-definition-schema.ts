import { AdditionalApis } from '../utils/additional-apis';
import { Properties } from '../utils/properties';

export interface ModuleDefinitionSchema
{
    boundedContextName: string;
    moduleName: string;
    moduleNames: string;
    aggregateName: string;
    hasOAuth: boolean;
    hasTenant: boolean;
    properties: Properties;
    additionalApis: AdditionalApis;
    excluded?: string[];        // set files to avoid create
}
