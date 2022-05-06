/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateApplicationsResolver } from './o-auth-paginate-applications.resolver';
import { OAuthPaginateApplicationsHandler } from '../handlers/o-auth-paginate-applications.handler';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthPaginateApplicationsResolver', () =>
{
    let resolver: OAuthPaginateApplicationsResolver;
    let handler: OAuthPaginateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateApplicationsResolver,
                {
                    provide : OAuthPaginateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<OAuthPaginateApplicationsResolver>(OAuthPaginateApplicationsResolver);
        handler = module.get<OAuthPaginateApplicationsHandler>(OAuthPaginateApplicationsHandler);
    });

    test('OAuthPaginateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : applications,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : applications,
            });
        });
    });
});