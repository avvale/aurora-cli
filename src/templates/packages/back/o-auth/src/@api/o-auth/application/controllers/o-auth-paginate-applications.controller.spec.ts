/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateApplicationsController } from './o-auth-paginate-applications.controller';
import { OAuthPaginateApplicationsHandler } from '../handlers/o-auth-paginate-applications.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthPaginateApplicationsController', () =>
{
    let controller: OAuthPaginateApplicationsController;
    let handler: OAuthPaginateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthPaginateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateApplicationsController>(OAuthPaginateApplicationsController);
        handler = module.get<OAuthPaginateApplicationsHandler>(OAuthPaginateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : applications,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : applications,
            });
        });
    });
});