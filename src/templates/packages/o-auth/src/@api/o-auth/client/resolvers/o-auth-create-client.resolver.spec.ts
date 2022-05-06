/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateClientResolver } from './o-auth-create-client.resolver';
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';
import { OAuthCreateClientInput } from '../../../../graphql';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthCreateClientResolver', () =>
{
    let resolver: OAuthCreateClientResolver;
    let handler: OAuthCreateClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateClientResolver,
                {
                    provide : OAuthCreateClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateClientResolver>(OAuthCreateClientResolver);
        handler = module.get<OAuthCreateClientHandler>(OAuthCreateClientHandler);
    });

    test('OAuthCreateClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthCreateClientInput>clients[0])).toBe(clients[0]);
        });
    });
});