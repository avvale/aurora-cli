/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationsClientsInput } from '@api/graphql';
import { OAuthUpdateApplicationsClientsHandler, OAuthUpdateApplicationsClientsResolver } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsClientsResolver', () =>
{
    let resolver: OAuthUpdateApplicationsClientsResolver;
    let handler: OAuthUpdateApplicationsClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationsClientsResolver,
                {
                    provide : OAuthUpdateApplicationsClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationsClientsResolver>(OAuthUpdateApplicationsClientsResolver);
        handler = module.get<OAuthUpdateApplicationsClientsHandler>(OAuthUpdateApplicationsClientsHandler);
    });

    test('OAuthUpdateApplicationsClientsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsClientsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationsClients updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await resolver.main(<OAuthUpdateApplicationsClientsInput>oAuthMockApplicationClientData[0])).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
