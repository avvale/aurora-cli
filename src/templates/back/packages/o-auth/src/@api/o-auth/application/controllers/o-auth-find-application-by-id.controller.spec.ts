import { OAuthFindApplicationByIdController, OAuthFindApplicationByIdHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationByIdController', () =>
{
    let controller: OAuthFindApplicationByIdController;
    let handler: OAuthFindApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindApplicationByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindApplicationByIdController>(OAuthFindApplicationByIdController);
        handler = module.get<OAuthFindApplicationByIdHandler>(OAuthFindApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await controller.main(oAuthMockApplicationData[0].id)).toBe(oAuthMockApplicationData[0]);
        });
    });
});
