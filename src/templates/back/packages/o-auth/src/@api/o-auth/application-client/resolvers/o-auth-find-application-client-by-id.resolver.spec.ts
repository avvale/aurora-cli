/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindApplicationClientByIdHandler, OAuthFindApplicationClientByIdResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientByIdResolver', () =>
{
    let resolver: OAuthFindApplicationClientByIdResolver;
    let handler: OAuthFindApplicationClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindApplicationClientByIdResolver,
                {
                    provide : OAuthFindApplicationClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindApplicationClientByIdResolver>(OAuthFindApplicationClientByIdResolver);
        handler = module.get<OAuthFindApplicationClientByIdHandler>(OAuthFindApplicationClientByIdHandler);
    });

    test('OAuthFindApplicationClientByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationClientByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationClient by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await resolver.main(oAuthMockApplicationClientData[0].id)).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
