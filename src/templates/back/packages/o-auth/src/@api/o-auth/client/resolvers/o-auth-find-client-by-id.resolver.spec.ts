/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindClientByIdHandler, OAuthFindClientByIdResolver } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientByIdResolver', () =>
{
    let resolver: OAuthFindClientByIdResolver;
    let handler: OAuthFindClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindClientByIdResolver,
                {
                    provide : OAuthFindClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindClientByIdResolver>(OAuthFindClientByIdResolver);
        handler = module.get<OAuthFindClientByIdHandler>(OAuthFindClientByIdHandler);
    });

    test('OAuthFindClientByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindClientByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(await resolver.main(oAuthMockClientData[0].id)).toBe(oAuthMockClientData[0]);
        });
    });
});
