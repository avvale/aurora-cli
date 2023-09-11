/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationClientByIdInput } from '@api/graphql';
import { OAuthUpdateApplicationClientByIdHandler, OAuthUpdateApplicationClientByIdResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationClientByIdResolver', () =>
{
    let resolver: OAuthUpdateApplicationClientByIdResolver;
    let handler: OAuthUpdateApplicationClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationClientByIdResolver,
                {
                    provide : OAuthUpdateApplicationClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationClientByIdResolver>(OAuthUpdateApplicationClientByIdResolver);
        handler = module.get<OAuthUpdateApplicationClientByIdHandler>(OAuthUpdateApplicationClientByIdHandler);
    });

    test('OAuthUpdateApplicationClientByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationClientByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationClient by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await resolver.main(<OAuthUpdateApplicationClientByIdInput>oAuthMockApplicationClientData[0])).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
