/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthUpsertApplicationHandler, OAuthUpsertApplicationResolver } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationResolver', () =>
{
    let resolver: OAuthUpsertApplicationResolver;
    let handler: OAuthUpsertApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertApplicationResolver,
                {
                    provide : OAuthUpsertApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpsertApplicationResolver>(OAuthUpsertApplicationResolver);
        handler = module.get<OAuthUpsertApplicationHandler>(OAuthUpsertApplicationHandler);
    });

    test('OAuthUpsertApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await resolver.main(<OAuthUpdateApplicationByIdInput>oAuthMockApplicationData[0])).toBe(oAuthMockApplicationData[0]);
        });
    });
});
