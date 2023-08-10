/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationsInput } from '@api/graphql';
import { OAuthUpdateApplicationsHandler, OAuthUpdateApplicationsResolver } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsResolver', () =>
{
    let resolver: OAuthUpdateApplicationsResolver;
    let handler: OAuthUpdateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationsResolver,
                {
                    provide : OAuthUpdateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationsResolver>(OAuthUpdateApplicationsResolver);
        handler = module.get<OAuthUpdateApplicationsHandler>(OAuthUpdateApplicationsHandler);
    });

    test('OAuthUpdateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await resolver.main(<OAuthUpdateApplicationsInput>oAuthMockApplicationData[0])).toBe(oAuthMockApplicationData[0]);
        });
    });
});
