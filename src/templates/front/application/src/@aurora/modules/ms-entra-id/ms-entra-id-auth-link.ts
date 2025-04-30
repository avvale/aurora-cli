import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { MsalService } from '@azure/msal-angular';
import { lastValueFrom } from 'rxjs';

export const msEntraIdAuthLink = (msalService: MsalService): ApolloLink =>
{
    return setContext(async (_, { headers }) =>
    {
        const account = msalService.instance.getAllAccounts()[0];

        if (!account) return { headers };

        const tokenResponse = await lastValueFrom(
            msalService.acquireTokenSilent({
                account,
                scopes: [],
            }),
        );

        const token = tokenResponse.accessToken;

        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        };
    })
};