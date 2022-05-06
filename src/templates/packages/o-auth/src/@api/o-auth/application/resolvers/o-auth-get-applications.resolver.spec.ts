/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetApplicationsResolver } from './o-auth-get-applications.resolver';
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthGetApplicationsResolver', () =>
{
    let resolver: OAuthGetApplicationsResolver;
    let handler: OAuthGetApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetApplicationsResolver,
                {
                    provide : OAuthGetApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthGetApplicationsResolver>(OAuthGetApplicationsResolver);
        handler = module.get<OAuthGetApplicationsHandler>(OAuthGetApplicationsHandler);
    });

    test('OAuthGetApplicationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetApplicationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a applications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications)));
            expect(await resolver.main()).toBe(applications);
        });
    });
});