import { ResolverType } from '../types';
import { AdditionalApi } from './additional-api';

// replace by AdditionalApis queries
export const getQueriesAdditionalApis = (additionalApis: AdditionalApi[]): AdditionalApi[] =>
{
    return additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY);
};
