import { AdditionalApi, AdditionalApiPaths } from '../types';

export const getAdditionalApiPaths = (additionalApi: AdditionalApi): AdditionalApiPaths =>
{
    const pathSegments = additionalApi.path.split('/').map(segment => segment.toKebabCase());

    if (!Array.isArray(pathSegments))  throw new Error(`Invalid additional api path ${pathSegments}`);
    if (pathSegments.length < 3)       throw new Error(`Invalid additional api path ${pathSegments}`);

    const pathBoundedContext = pathSegments.shift() as string;
    const pathAction         = pathSegments.pop() as string;

    return {
        pathBoundedContext,
        pathAction,
        pathSegments,
    };
};

// replace by AdditionalApi getApiFileName
export const getAdditionalApiFileName = (additionalApi: AdditionalApi): string =>
{
    const additionalApiPaths = getAdditionalApiPaths(additionalApi);

    return additionalApiPaths.pathBoundedContext.toKebabCase() + '-' + additionalApiPaths.pathAction.toKebabCase() + '-' + additionalApiPaths.pathSegments.join('-');
};

// replace by AdditionalApi getClassName
export const getClassNameAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    const additionalApiPaths = getAdditionalApiPaths(additionalApi);

    return additionalApiPaths.pathBoundedContext.toPascalCase() + additionalApiPaths.pathAction.toPascalCase() +  additionalApiPaths.pathSegments.map(segment => segment.toPascalCase()).join('');
};

// replace by AdditionalApi getResolverName
export const getResolverNameAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    const additionalApiPaths = getAdditionalApiPaths(additionalApi);

    return additionalApiPaths.pathBoundedContext.toCamelCase() + additionalApiPaths.pathAction.toPascalCase() + additionalApiPaths.pathSegments.map(segment => segment.toPascalCase()).join('');
};

// replace by AdditionalApi getVariableName
export const getVariableNameAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    const additionalApiPaths = getAdditionalApiPaths(additionalApi);

    return additionalApiPaths.pathAction.toCamelCase() + additionalApiPaths.pathSegments.map(segment => segment.toPascalCase()).join('');
};
