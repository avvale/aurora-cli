import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateClientsResolver } from './o-auth-create-clients.resolver';
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';
import { OAuthCreateClientInput } from '../../../../graphql';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthCreateClientsResolver', () =>
{
    let resolver: OAuthCreateClientsResolver;
    let handler: OAuthCreateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientsResolver,
                {
                    provide : OAuthCreateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateClientsResolver>(OAuthCreateClientsResolver);
        handler = module.get<OAuthCreateClientsHandler>(OAuthCreateClientsHandler);
    });

    test('OAuthCreateClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an clients created', async () =>
        {
            expect(await resolver.main(<OAuthCreateClientInput[]>clients)).toBe(undefined);
        });
    });
});