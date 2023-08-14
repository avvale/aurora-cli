import { OAuthUpsertClientController, OAuthUpsertClientHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertClientController', () =>
{
    let controller: OAuthUpsertClientController;
    let handler: OAuthUpsertClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertClientController,
            ],
            providers: [
                {
                    provide : OAuthUpsertClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertClientController>(OAuthUpsertClientController);
        handler = module.get<OAuthUpsertClientHandler>(OAuthUpsertClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an client upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(await controller.main(oAuthMockClientData[0])).toBe(oAuthMockClientData[0]);
        });
    });
});
