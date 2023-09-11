/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthGetApplicationsClientsHandler, OAuthGetApplicationsClientsResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsClientsResolver', () =>
{
    let resolver: OAuthGetApplicationsClientsResolver;
    let handler: OAuthGetApplicationsClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetApplicationsClientsResolver,
                {
                    provide : OAuthGetApplicationsClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthGetApplicationsClientsResolver>(OAuthGetApplicationsClientsResolver);
        handler = module.get<OAuthGetApplicationsClientsHandler>(OAuthGetApplicationsClientsHandler);
    });

    test('OAuthGetApplicationsClientsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetApplicationsClientsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a oAuthMockApplicationClientData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData)));
            expect(await resolver.main()).toBe(oAuthMockApplicationClientData);
        });
    });
});
