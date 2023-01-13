/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindClientResolver } from './o-auth-find-client.resolver';
import { OAuthFindClientHandler } from '../handlers/o-auth-find-client.handler';

// sources
import { clients } from '@app/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthFindClientResolver', () =>
{
    let resolver: OAuthFindClientResolver;
    let handler: OAuthFindClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindClientResolver,
                {
                    provide : OAuthFindClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindClientResolver>(OAuthFindClientResolver);
        handler = module.get<OAuthFindClientHandler>(OAuthFindClientHandler);
    });

    test('OAuthFindClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a client', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main()).toBe(clients[0]);
        });
    });
});