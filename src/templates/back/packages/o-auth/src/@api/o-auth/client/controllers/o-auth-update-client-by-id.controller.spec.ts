import { OAuthUpdateClientByIdController, OAuthUpdateClientByIdHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientByIdController', () =>
{
    let controller: OAuthUpdateClientByIdController;
    let handler: OAuthUpdateClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateClientByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateClientByIdController>(OAuthUpdateClientByIdController);
        handler = module.get<OAuthUpdateClientByIdHandler>(OAuthUpdateClientByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a client updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(await controller.main(oAuthMockClientData[0])).toBe(oAuthMockClientData[0]);
        });
    });
});
