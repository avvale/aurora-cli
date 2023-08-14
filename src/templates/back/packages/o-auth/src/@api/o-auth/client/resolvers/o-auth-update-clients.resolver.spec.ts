/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateClientsInput } from '@api/graphql';
import { OAuthUpdateClientsHandler, OAuthUpdateClientsResolver } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientsResolver', () =>
{
    let resolver: OAuthUpdateClientsResolver;
    let handler: OAuthUpdateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateClientsResolver,
                {
                    provide : OAuthUpdateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateClientsResolver>(OAuthUpdateClientsResolver);
        handler = module.get<OAuthUpdateClientsHandler>(OAuthUpdateClientsHandler);
    });

    test('OAuthUpdateClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a clients updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(await resolver.main(<OAuthUpdateClientsInput>oAuthMockClientData[0])).toBe(oAuthMockClientData[0]);
        });
    });
});
