/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientsResolver } from './o-auth-delete-clients.resolver';
import { OAuthDeleteClientsHandler } from '../handlers/o-auth-delete-clients.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthDeleteClientsResolver', () =>
{
    let resolver: OAuthDeleteClientsResolver;
    let handler: OAuthDeleteClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteClientsResolver,
                {
                    provide : OAuthDeleteClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteClientsResolver>(OAuthDeleteClientsResolver);
        handler = module.get<OAuthDeleteClientsHandler>(OAuthDeleteClientsHandler);
    });

    test('OAuthDeleteClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an clients deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await resolver.main()).toBe(clients);
        });
    });
});