import { OAuthCreateClientInput } from '@api/graphql';
import { OAuthCreateClientsHandler, OAuthCreateClientsResolver } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientsResolver', () =>
{
    let resolver: OAuthCreateClientsResolver;

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
            expect(await resolver.main(<OAuthCreateClientInput[]>oAuthMockClientData)).toBe(undefined);
        });
    });
});
