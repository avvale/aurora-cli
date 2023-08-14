import { OAuthDeleteApplicationsController, OAuthDeleteApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsController', () =>
{
    let controller: OAuthDeleteApplicationsController;
    let handler: OAuthDeleteApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthDeleteApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteApplicationsController>(OAuthDeleteApplicationsController);
        handler = module.get<OAuthDeleteApplicationsHandler>(OAuthDeleteApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockApplicationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData)));
            expect(await controller.main()).toBe(oAuthMockApplicationData);
        });
    });
});
