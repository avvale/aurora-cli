import { OAuthUpdateApplicationsController, OAuthUpdateApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsController', () =>
{
    let controller: OAuthUpdateApplicationsController;
    let handler: OAuthUpdateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthUpdateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateApplicationsController>(OAuthUpdateApplicationsController);
        handler = module.get<OAuthUpdateApplicationsHandler>(OAuthUpdateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await controller.main(oAuthMockApplicationData[0])).toBe(oAuthMockApplicationData[0]);
        });
    });
});
