import { OAuthCreateApplicationInput } from '@api/graphql';
import { OAuthCreateApplicationsHandler, OAuthCreateApplicationsResolver } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsResolver', () =>
{
    let resolver: OAuthCreateApplicationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsResolver,
                {
                    provide : OAuthCreateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateApplicationsResolver>(OAuthCreateApplicationsResolver);
    });

    test('OAuthCreateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications created', async () =>
        {
            expect(await resolver.main(<OAuthCreateApplicationInput[]>oAuthMockApplicationData)).toBe(undefined);
        });
    });
});
