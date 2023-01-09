import { ResolverType } from '../types';

export class AdditionalApi
{
    public path: string;
    public resolverType: ResolverType;
    public httpMethod: HttpMethodType;
    private pathSegments: string[];
    private pathAction: string;
    private pathBoundedContext: string;

    get getApiFileName(): string
    {
        return this.pathBoundedContext.toKebabCase() + '-' + this.pathAction.toKebabCase() + '-' + this.pathSegments.join('-');
    }

    get getClassName(): string
    {
        return this.pathBoundedContext.toPascalCase() + this.pathAction.toPascalCase() + this.pathSegments.map(segment => segment.toPascalCase()).join('');
    }

    get getResolverName(): string
    {
        return this.pathBoundedContext.toCamelCase() + this.pathAction.toPascalCase() + this.pathSegments.map(segment => segment.toPascalCase()).join('');
    }

    get getVariableName(): string
    {
        return this.pathAction.toCamelCase() + this.pathSegments.map(segment => segment.toPascalCase()).join('');
    }

    constructor(
        payload: {
            path: string;
            resolverType: ResolverType;
            httpMethod: HttpMethodType;
        },
    )
    {
        this.path = payload.path;
        this.resolverType = payload.resolverType;
        this.httpMethod = payload.httpMethod;

        this.pathSegments = payload.path.split('/').map(segment => segment.toKebabCase());

        if (!Array.isArray(this.pathSegments))  throw new Error('Invalid path');
        if (this.pathSegments.length < 3)       throw new Error('Invalid path');

        this.pathBoundedContext = this.pathSegments.shift() as string;
        this.pathAction         = this.pathSegments.pop() as string;
    }

    toDto(): any
    {
        return {
            path        : this.path,
            resolverType: this.resolverType,
            httpMethod  : this.httpMethod,
        };
    }
}

export enum HttpMethodType
{
    GET = 'get',
    HEAD = 'head',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    CONNECT = 'connect',
    OPTIONS = 'options',
    TRACE = 'trace',
    PATCH = 'patch',
}
