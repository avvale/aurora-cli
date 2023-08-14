/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthUpsertClientHandler, OAuthUpsertClientResolver } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertClientResolver', () =>
{
    let resolver: OAuthUpsertClientResolver;
    let handler: OAuthUpsertClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertClientResolver,
                {
                    provide : OAuthUpsertClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpsertClientResolver>(OAuthUpsertClientResolver);
        handler = module.get<OAuthUpsertClientHandler>(OAuthUpsertClientHandler);
    });

    test('OAuthUpsertClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpsertClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(await resolver.main(<OAuthUpdateClientByIdInput>oAuthMockClientData[0])).toBe(oAuthMockClientData[0]);
        });
    });
});
