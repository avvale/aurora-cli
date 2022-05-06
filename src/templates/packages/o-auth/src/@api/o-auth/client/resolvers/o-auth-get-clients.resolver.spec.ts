/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetClientsResolver } from './o-auth-get-clients.resolver';
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthGetClientsResolver', () =>
{
    let resolver: OAuthGetClientsResolver;
    let handler: OAuthGetClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetClientsResolver,
                {
                    provide : OAuthGetClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthGetClientsResolver>(OAuthGetClientsResolver);
        handler = module.get<OAuthGetClientsHandler>(OAuthGetClientsHandler);
    });

    test('OAuthGetClientsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetClientsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a clients', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await resolver.main()).toBe(clients);
        });
    });
});