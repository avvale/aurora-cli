/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateClientsResolver } from './o-auth-update-clients.resolver';
import { OAuthUpdateClientsHandler } from '../handlers/o-auth-update-clients.handler';
import { OAuthUpdateClientsInput } from '../../../../graphql';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientsResolver', () =>
{
    let resolver: OAuthUpdateClientsResolver;
    let handler: OAuthUpdateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateClientsResolver,
                {
                    provide : OAuthUpdateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateClientsResolver>(OAuthUpdateClientsResolver);
        handler = module.get<OAuthUpdateClientsHandler>(OAuthUpdateClientsHandler);
    });

    test('OAuthUpdateClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a clients updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthUpdateClientsInput>clients[0])).toBe(clients[0]);
        });
    });
});