import { OAuthGetApplicationsController, OAuthGetApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsController', () =>
{
    let controller: OAuthGetApplicationsController;
    let handler: OAuthGetApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthGetApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetApplicationsController>(OAuthGetApplicationsController);
        handler = module.get<OAuthGetApplicationsHandler>(OAuthGetApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockApplicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData)));
            expect(await controller.main()).toBe(oAuthMockApplicationData);
        });
    });
});
