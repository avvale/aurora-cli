/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateClientResolver } from './o-auth-update-client.resolver';
import { OAuthUpdateClientHandler } from '../handlers/o-auth-update-client.handler';
import { OAuthUpdateClientInput } from '../../../../../graphql';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientResolver', () =>
{
    let resolver: OAuthUpdateClientResolver;
    let handler: OAuthUpdateClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateClientResolver,
                {
                    provide : OAuthUpdateClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateClientResolver>(OAuthUpdateClientResolver);
        handler = module.get<OAuthUpdateClientHandler>(OAuthUpdateClientHandler);
    });

    test('OAuthUpdateClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a client created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthUpdateClientInput>clients[0])).toBe(clients[0]);
        });
    });
});