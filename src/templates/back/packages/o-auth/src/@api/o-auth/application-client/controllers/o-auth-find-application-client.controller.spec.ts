import { OAuthFindApplicationClientController, OAuthFindApplicationClientHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientController', () =>
{
    let controller: OAuthFindApplicationClientController;
    let handler: OAuthFindApplicationClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindApplicationClientController,
            ],
            providers: [
                {
                    provide : OAuthFindApplicationClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindApplicationClientController>(OAuthFindApplicationClientController);
        handler = module.get<OAuthFindApplicationClientHandler>(OAuthFindApplicationClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationClient', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await controller.main()).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
