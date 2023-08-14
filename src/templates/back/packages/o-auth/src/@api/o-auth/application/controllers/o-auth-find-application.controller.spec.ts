import { OAuthFindApplicationController, OAuthFindApplicationHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationController', () =>
{
    let controller: OAuthFindApplicationController;
    let handler: OAuthFindApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindApplicationController,
            ],
            providers: [
                {
                    provide : OAuthFindApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindApplicationController>(OAuthFindApplicationController);
        handler = module.get<OAuthFindApplicationHandler>(OAuthFindApplicationHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a application', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await controller.main()).toBe(oAuthMockApplicationData[0]);
        });
    });
});
