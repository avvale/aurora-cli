import { Injectable } from '@angular/core';
//import { HttpHeaders } from '@angular/common/http';
import { log } from '..';
import { HttpLink } from 'apollo-angular/http';
import { v4 as uuidv4 } from 'uuid';


// import { GraphQLError, Credentials, HttpHeader } from '@horus/types/core.types';
import { ApolloClientOptions, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
// import { setContext } from 'apollo-link-context';
import { environment } from 'environments/environment';
// import * as moment from 'moment-timezone';

@Injectable({
    providedIn: 'root',
})
export class ApolloService
{
    // private httpHeaders: HttpHeader = {};

    // accessors
    /* get headers()
    {
        let httpHeaders = new HttpHeaders();
        for (const httpHeaderKey in this.httpHeaders)
        {
            httpHeaders = httpHeaders.set(httpHeaderKey, this.httpHeaders[httpHeaderKey]);
        }
        return httpHeaders;
    } */

    constructor(
        private httpLink: HttpLink,
    ) { }

    /* addHttpHeader(httpHeader: HttpHeader)
    {
        this.httpHeaders = Object.assign({}, this.httpHeaders, httpHeader);
    }

    removeHttpHeader(httpHeaderKeys: string[])
    {
        for (const httpHeaderKey of httpHeaderKeys)
        {
            delete this.httpHeaders[httpHeaderKey];
        }
    } */

    apolloFactory()
    {
        // return this._liveApolloFactory();
    }

    liveApolloFactory(): ApolloClientOptions<NormalizedCacheObject>
    {
        log('[DEBUG] GraphQLModule Initialized');

        // flag to active trace of graphql apollo
        const debug = true;

        // create cache policy
        const cache = new InMemoryCache({
            addTypename: true,  // add __typename field in graphql types
            /*  typePolicies: {
                Pagination: {
                    keyFields: () => {

                    },
                },
            }, */
            /*
            (o: any) =>
            {
                if (o['id'])
                {
                    if (debug) console.log(`[DEBUG] Apollo ID for type ${o.__typename}:`, `${o['id']}`);
                    return `${o['id']}`;
                }

                // create random uuid
                const uuid = uuidv4();
                if (debug) console.log(`[DEBUG] Apollo ID for type ${o.__typename}:`, uuid);
                return uuid;
            }, */
        });

        // create Apollo Http link that will be concat in ApolloClientOptions
        const httpLink = this.httpLink.create({
            uri: environment.api.graphql,
        });

        // manage jwt and refresh token
        /* const auth = setContext(async (_, { headers }) =>
        {
            // add guest timezone to request
            this.addHttpHeader({ 'X-Timezone': moment.tz.guess() });

            return {
                headers: this.httpHeaders
            };
        }); */

        // manage errors
        /*  const error = onError(({ graphQLErrors, networkError, operation, forward }) =>
        {
            // network error
            if (networkError)
            {
                log('[DEBUG] Network graphql error', networkError);
            }

            // graphql error
            if (graphQLErrors && graphQLErrors.length > 0)
            {
                log('[DEBUG] Unknown graphql error', graphQLErrors);

                graphQLErrors.map((item: GraphQLError) =>
                {
                    if (item['extensions'] && item['extensions']['validationErrors'])
                    {
                        let message = '';

                        // set errors from laravel validator
                        for(const key in item['extensions']['validationErrors'])
                        {
                            message += item['extensions']['validationErrors'][key] + '<br>';
                        }

                        log('[DEBUG] Error', message);
                    }
                });
            }
        }); */

        /* return {
            name: 'live',
            link: ApolloLink.from([auth, error, httpLink as any]),
            cache: cache,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all'
                },
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all'
                },
                mutate: {
                    errorPolicy: 'all'
                }
            }
        }; */

        return {
            name          : 'live',
            cache,
            link          : httpLink,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
                mutate: {
                    errorPolicy: 'all',
                },
            },
        };
    }
}