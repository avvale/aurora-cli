/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteApplicationsClientsHandler, OAuthDeleteApplicationsClientsResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsClientsResolver', () =>
{
    let resolver: OAuthDeleteApplicationsClientsResolver;
    let handler: OAuthDeleteApplicationsClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteApplicationsClientsResolver,
                {
                    provide : OAuthDeleteApplicationsClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteApplicationsClientsResolver>(OAuthDeleteApplicationsClientsResolver);
        handler = module.get<OAuthDeleteApplicationsClientsHandler>(OAuthDeleteApplicationsClientsHandler);
    });

    test('OAuthDeleteApplicationsClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an oAuthMockApplicationClientData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData)));
            expect(await resolver.main()).toBe(oAuthMockApplicationClientData);
        });
    });
});
