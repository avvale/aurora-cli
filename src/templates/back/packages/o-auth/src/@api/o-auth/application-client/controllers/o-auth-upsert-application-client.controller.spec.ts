import { OAuthUpsertApplicationClientController, OAuthUpsertApplicationClientHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationClientController', () =>
{
    let controller: OAuthUpsertApplicationClientController;
    let handler: OAuthUpsertApplicationClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertApplicationClientController,
            ],
            providers: [
                {
                    provide : OAuthUpsertApplicationClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertApplicationClientController>(OAuthUpsertApplicationClientController);
        handler = module.get<OAuthUpsertApplicationClientHandler>(OAuthUpsertApplicationClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationClient upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await controller.main(oAuthMockApplicationClientData[0])).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
