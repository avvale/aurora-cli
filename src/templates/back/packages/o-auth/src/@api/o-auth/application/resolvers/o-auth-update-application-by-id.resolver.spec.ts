/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthUpdateApplicationByIdHandler, OAuthUpdateApplicationByIdResolver } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationByIdResolver', () =>
{
    let resolver: OAuthUpdateApplicationByIdResolver;
    let handler: OAuthUpdateApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationByIdResolver,
                {
                    provide : OAuthUpdateApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationByIdResolver>(OAuthUpdateApplicationByIdResolver);
        handler = module.get<OAuthUpdateApplicationByIdHandler>(OAuthUpdateApplicationByIdHandler);
    });

    test('OAuthUpdateApplicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await resolver.main(<OAuthUpdateApplicationByIdInput>oAuthMockApplicationData[0])).toBe(oAuthMockApplicationData[0]);
        });
    });
});
