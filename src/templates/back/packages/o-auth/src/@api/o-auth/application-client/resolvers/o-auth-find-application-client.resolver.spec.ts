/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindApplicationClientHandler, OAuthFindApplicationClientResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientResolver', () =>
{
    let resolver: OAuthFindApplicationClientResolver;
    let handler: OAuthFindApplicationClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindApplicationClientResolver,
                {
                    provide : OAuthFindApplicationClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindApplicationClientResolver>(OAuthFindApplicationClientResolver);
        handler = module.get<OAuthFindApplicationClientHandler>(OAuthFindApplicationClientHandler);
    });

    test('OAuthFindApplicationClientResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationClientResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationClient', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await resolver.main()).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
