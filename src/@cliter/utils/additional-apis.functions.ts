import { AdditionalApi, ResolverType } from '../types';

// replace by AdditionalApis queries
export const getAdditionalApiQueries = (
    additionalApis: AdditionalApi[],
): AdditionalApi[] =>
{
    return additionalApis?.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY);
};

// replace by AdditionalApis mutations
export const getAdditionalApiMutations = (
    additionalApis: AdditionalApi[],
): AdditionalApi[] =>
{
    return additionalApis?.filter(additionalApi => additionalApi.resolverType === ResolverType.MUTATION);
};

// replace by AdditionalApis lengthQueries
export const countAdditionalApiQueries = (
    additionalApis: AdditionalApi[],
): number =>
{
    return additionalApis?.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY).length;
};

// replace by AdditionalApis lengthMutations
export const countAdditionalApiMutations = (
    additionalApis: AdditionalApi[],
): number =>
{
    return additionalApis?.filter(additionalApi => additionalApi.resolverType === ResolverType.MUTATION).length;
};

export const hasAdditionalApiQueries = (
    additionalApis: AdditionalApi[],
): boolean =>
{
    return additionalApis?.some(additionalApi => additionalApi.resolverType === ResolverType.QUERY);
};

export const hasAdditionalApiMutations = (
    additionalApis: AdditionalApi[],
): boolean =>
{
    return additionalApis?.some(additionalApi => additionalApi.resolverType === ResolverType.MUTATION);
};
