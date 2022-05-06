/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientByIdResolver } from './o-auth-delete-client-by-id.resolver';
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthDeleteClientByIdResolver', () =>
{
    let resolver: OAuthDeleteClientByIdResolver;
    let handler: OAuthDeleteClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteClientByIdResolver,
                {
                    provide : OAuthDeleteClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteClientByIdResolver>(OAuthDeleteClientByIdResolver);
        handler = module.get<OAuthDeleteClientByIdHandler>(OAuthDeleteClientByIdHandler);
    });

    test('OAuthDeleteClientByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(clients[0].id)).toBe(clients[0]);
        });
    });
});