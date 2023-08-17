import { AdditionalApi } from './additional-api';

// replace by AdditionalApi getClassName
export const getClassNameAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    return getPathBoundedContextAdditionalApi(additionalApi).toPascalCase() + getPathActionAdditionalApi(additionalApi).toPascalCase() + getPathSegmentsAdditionalApi(additionalApi).map(segment => segment.toPascalCase()).join('');
};

// replace by AdditionalApi getResolverName
export const getResolverNameAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    return getPathBoundedContextAdditionalApi(additionalApi).toCamelCase() + getPathActionAdditionalApi(additionalApi).toPascalCase() + getPathSegmentsAdditionalApi(additionalApi).map(segment => segment.toPascalCase()).join('');
};

// replace by AdditionalApi getVariableName
export const getVariableNameAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    return getPathActionAdditionalApi(additionalApi).toCamelCase() + getPathSegmentsAdditionalApi(additionalApi).map(segment => segment.toPascalCase()).join('');
};

// private functions
const getPathSegmentsAdditionalApi = (additionalApi: AdditionalApi): string[] =>
{
    return additionalApi.path.split('/').map(segment => segment.toKebabCase());
};

const getPathBoundedContextAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    return getPathSegmentsAdditionalApi(additionalApi).shift() as string;
};

const getPathActionAdditionalApi = (additionalApi: AdditionalApi): string =>
{
    return getPathSegmentsAdditionalApi(additionalApi).pop() as string;
};
