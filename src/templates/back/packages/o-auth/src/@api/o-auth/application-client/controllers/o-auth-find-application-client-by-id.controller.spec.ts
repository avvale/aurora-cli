import { OAuthFindApplicationClientByIdController, OAuthFindApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientByIdController', () =>
{
    let controller: OAuthFindApplicationClientByIdController;
    let handler: OAuthFindApplicationClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindApplicationClientByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindApplicationClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindApplicationClientByIdController>(OAuthFindApplicationClientByIdController);
        handler = module.get<OAuthFindApplicationClientByIdHandler>(OAuthFindApplicationClientByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationClientByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationClient by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await controller.main(oAuthMockApplicationClientData[0].id)).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
