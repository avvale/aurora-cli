/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationClientByIdInput } from '@api/graphql';
import { OAuthUpsertApplicationClientHandler, OAuthUpsertApplicationClientResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationClientResolver', () =>
{
    let resolver: OAuthUpsertApplicationClientResolver;
    let handler: OAuthUpsertApplicationClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertApplicationClientResolver,
                {
                    provide : OAuthUpsertApplicationClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpsertApplicationClientResolver>(OAuthUpsertApplicationClientResolver);
        handler = module.get<OAuthUpsertApplicationClientHandler>(OAuthUpsertApplicationClientHandler);
    });

    test('OAuthUpsertApplicationClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationClient upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await resolver.main(<OAuthUpdateApplicationClientByIdInput>oAuthMockApplicationClientData[0])).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
