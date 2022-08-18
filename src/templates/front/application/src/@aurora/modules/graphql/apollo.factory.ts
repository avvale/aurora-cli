import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { Utils } from '@aurora';
import { TranslocoService } from '@ngneat/transloco';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { log } from '@aurora/functions/log';
import { HttpLink } from 'apollo-angular/http/http-link';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { extractGraphqlMessageErrors, extractGraphqlStatusCodeErrors } from './graphql.functions';

export const apolloFactory = (
    httpLink: HttpLink,
    authService: AuthService,
    confirmationService: FuseConfirmationService,
    translocoService: TranslocoService,
): ApolloClientOptions<NormalizedCacheObject> =>
{
    const headers = new Headers();

    const auth = setContext(async(operation, context) =>
    {
        // set user timezone
        headers.set('X-Timezone', Utils.timezone());

        // return basic authentication form login
        if (operation.operationName === 'oAuthCreateCredentials')
        {
            headers.set('Authorization', `Basic ${btoa(environment.oAuth.applicationCode + ':' + environment.oAuth.applicationSecret)}`);
        }
        else
        {
            // check access token, if is expired create other one with refresh token
            await lastValueFrom(authService.check());

            // set bearer token
            headers.set('Authorization', `Bearer ${authService.accessToken}`);
        }

        return {
            headers: Object.fromEntries(headers.entries()),
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
                authService.signOut();
                location.reload();
                return;
            }

            const errorMessage = translocoService.translate('error.' + extractGraphqlStatusCodeErrors(graphQLErrors));
            confirmationService.open({
                title  : 'Error',
                message: errorMessage === 'error.' + extractGraphqlStatusCodeErrors(graphQLErrors) ? extractGraphqlMessageErrors(graphQLErrors) : errorMessage,
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


    const link = ApolloLink.from([auth, error, httpLink.create({ uri: environment.api.graphql })]);
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
