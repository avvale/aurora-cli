/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindClientByIdResolver } from './o-auth-find-client-by-id.resolver';
import { OAuthFindClientByIdHandler } from '../handlers/o-auth-find-client-by-id.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthFindClientByIdResolver', () =>
{
    let resolver: OAuthFindClientByIdResolver;
    let handler: OAuthFindClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindClientByIdResolver,
                {
                    provide : OAuthFindClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindClientByIdResolver>(OAuthFindClientByIdResolver);
        handler = module.get<OAuthFindClientByIdHandler>(OAuthFindClientByIdHandler);
    });

    test('OAuthFindClientByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindClientByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(clients[0].id)).toBe(clients[0]);
        });
    });
});