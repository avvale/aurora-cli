import { ResolverType } from '../types';
import { AdditionalApi } from './additional-api';

// replace by AdditionalApis queries
export const getQueriesAdditionalApis = (
    additionalApis: AdditionalApi[],
): AdditionalApi[] =>
{
    return additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY);
};

// replace by AdditionalApis mutations
export const getMutationsAdditionalApis = (
    additionalApis: AdditionalApi[],
): AdditionalApi[] =>
{
    return additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.MUTATION);
};

// replace by AdditionalApis lengthMutations
export const countAdditionalApisMutations = (
    additionalApis: AdditionalApi[],
): number =>
{
    return additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.MUTATION).length;
};

// replace by AdditionalApis lengthQueries
export const countAdditionalApisQueries = (
    additionalApis: AdditionalApi[],
): number =>
{
    return additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY).length;
};
