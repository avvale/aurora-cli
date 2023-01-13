/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationsResolver } from './o-auth-delete-applications.resolver';
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationsResolver', () =>
{
    let resolver: OAuthDeleteApplicationsResolver;
    let handler: OAuthDeleteApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteApplicationsResolver,
                {
                    provide : OAuthDeleteApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteApplicationsResolver>(OAuthDeleteApplicationsResolver);
        handler = module.get<OAuthDeleteApplicationsHandler>(OAuthDeleteApplicationsHandler);
    });

    test('OAuthDeleteApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications)));
            expect(await resolver.main()).toBe(applications);
        });
    });
});