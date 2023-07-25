import { ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthenticationService, Utils, extractGraphqlMessageErrors, extractGraphqlStatusErrorCodes, log } from '@aurora';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';
import { HttpLink } from 'apollo-angular/http/http-link';
import { createUploadLink } from 'apollo-upload-client';
import { environment } from 'environments/environment';
import { lastValueFrom } from 'rxjs';

export const apolloFactory = (
    httpLink: HttpLink,
    authenticationService: AuthenticationService,
    confirmationService: FuseConfirmationService,
    translocoService: TranslocoService,
): ApolloClientOptions<NormalizedCacheObject> =>
{
    // Container of headers in force during the whole execution of the application.
    // Doesn't reset on each call, keep headers from every calls.
    const headers = {};

    const initHeaders = setContext(async(operation, context) =>
    {
        // return original context headers
        return {
            headers: context.headers,
        };
    });

    const customHeaders = setContext(async(operation, context) =>
    {
        if (context.headers)
        {
            for (const [key, value] of Object.entries(context.headers))
            {
                // set custom headers
                headers[key] = value;
            }
        }

        return {
            headers,
        };
    });

    const timezone = setContext(async(operation, context) =>
    {
        headers['X-Timezone'] = Utils.timezone();

        return {
            headers,
        };
    });

    const auth = setContext(async(operation, context) =>
    {
        // return basic authentication form login
        if (operation.operationName === 'oAuthCreateCredentials')
        {
            headers['Authorization'] = `Basic ${btoa(environment.oAuth.applicationCode + ':' + environment.oAuth.applicationSecret)}`;
        }
        // check access token, if is expired create other one with refresh token
        else if (await lastValueFrom(authenticationService.check()))
        {
            // set bearer token
            headers['Authorization'] = `Bearer ${authenticationService.accessToken}`;
        }

        return {
            headers,
        };
    });

    // manage errors
    const error = onError(({ graphQLErrors, networkError, response, operation, forward }) =>
    {
        // graphql error
        if (graphQLErrors)
        {
            log(`[DEBUG] GraphQL Error: ${extractGraphqlMessageErrors(graphQLErrors)}`);

            const unauthorizedError = graphQLErrors.find(({ message, extensions }: { message: string; extensions: any; }) => extensions.response?.statusCode === 401);

            if (unauthorizedError)
            {
                authenticationService.signOut();
                location.reload();
                return;
            }

            const errorCodes = extractGraphqlStatusErrorCodes(graphQLErrors);
            const errorMessage = translocoService.translate('error.' + errorCodes);
            confirmationService.open({
                title  : `Error [${errorCodes}]`,
                message: errorMessage === 'error.' + errorCodes ? extractGraphqlMessageErrors(graphQLErrors) : errorMessage,
                icon   : {
                    show : true,
                    name : 'error',
                    color: 'error',
                },
                actions: {
                    confirm: {
                        show : true,
                        label: 'Ok',
                        color: 'warn',
                    },
                    cancel: {
                        show: false,
                    },
                },
            });
        }

        // network error
        if (networkError)
        {
            log('[DEBUG] - network GraphQL error', networkError);

            switch (networkError['status'])
            {
                case 0:
                    // ver src/@horus/components/apollo/apollo.service.ts de horus cci
                    break;

                case 500:
                    // ver src/@horus/components/apollo/apollo.service.ts de horus cci
                    break;
            }
        }
    });

    const link = ApolloLink.from([
        initHeaders,
        customHeaders,
        timezone,
        auth,
        error,
        /**
         * Apollo upload client, replace to
         *  httpLink.create({
         *    uri: environment.api.graphql,
         *  }),
         */
        createUploadLink({
            uri: environment.api.graphql,
        }),
    ]);

    const cache = new InMemoryCache({
        addTypename: true,  // add __typename field in graphql types
    });

    // disabled cache
    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    };

    return {
        link,
        cache,
        defaultOptions,
    };
};
