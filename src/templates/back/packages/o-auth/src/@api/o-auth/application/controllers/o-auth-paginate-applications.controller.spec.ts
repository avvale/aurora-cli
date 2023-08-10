import { OAuthPaginateApplicationsController, OAuthPaginateApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

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

        test('should return a oAuthMockApplicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : oAuthMockApplicationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : oAuthMockApplicationData,
            });
        });
    });
});
