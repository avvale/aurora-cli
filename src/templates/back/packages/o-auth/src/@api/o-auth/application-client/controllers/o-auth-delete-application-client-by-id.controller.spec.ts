/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthDeleteApplicationClientByIdController, OAuthDeleteApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationClientByIdController', () =>
{
    let controller: OAuthDeleteApplicationClientByIdController;
    let handler: OAuthDeleteApplicationClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteApplicationClientByIdController,
            ],
            providers: [
                {
                    provide : OAuthDeleteApplicationClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteApplicationClientByIdController>(OAuthDeleteApplicationClientByIdController);
        handler = module.get<OAuthDeleteApplicationClientByIdHandler>(OAuthDeleteApplicationClientByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationClientByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationClient deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await controller.main(oAuthMockApplicationClientData[0].id)).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
