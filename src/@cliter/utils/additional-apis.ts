import { Property } from './property';
import { AdditionalApi } from './additional-api';
import { ResolverType } from '../types';

export class AdditionalApis
{
    additionalApis: AdditionalApi[] = [];

    *[Symbol.iterator]()
    {
        for (const additionalApi of this.additionalApis) yield additionalApi;
    }

    get length(): number
    {
        return this.additionalApis.length;
    }

    get lengthMutations(): number
    {
        return this.additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.MUTATION).length;
    }

    get lengthQueries(): number
    {
        return this.additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY).length;
    }

    get mutations(): AdditionalApi[]
    {
        return this.additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.MUTATION);
    }

    get queries(): AdditionalApi[]
    {
        return this.additionalApis.filter(additionalApi => additionalApi.resolverType === ResolverType.QUERY);
    }

    add(additionalApi: AdditionalApi): void
    {
        this.additionalApis.push(additionalApi);
    }

    filter(fn: () => { /**/ }): AdditionalApi[]
    {
        return this.additionalApis.filter(fn);
    }

    toDto(): Property[]
    {
        return this.additionalApis.map(additionalApi => additionalApi.toDto());
    }
}
