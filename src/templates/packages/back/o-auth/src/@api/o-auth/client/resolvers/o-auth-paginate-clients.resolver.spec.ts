/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateClientsResolver } from './o-auth-paginate-clients.resolver';
import { OAuthPaginateClientsHandler } from '../handlers/o-auth-paginate-clients.handler';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthPaginateClientsResolver', () =>
{
    let resolver: OAuthPaginateClientsResolver;
    let handler: OAuthPaginateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateClientsResolver,
                {
                    provide : OAuthPaginateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<OAuthPaginateClientsResolver>(OAuthPaginateClientsResolver);
        handler = module.get<OAuthPaginateClientsHandler>(OAuthPaginateClientsHandler);
    });

    test('OAuthPaginateClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a clients', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : clients,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : clients,
            });
        });
    });
});