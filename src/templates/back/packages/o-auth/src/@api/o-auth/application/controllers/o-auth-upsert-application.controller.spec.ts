import { OAuthUpsertApplicationController, OAuthUpsertApplicationHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertApplicationController', () =>
{
    let controller: OAuthUpsertApplicationController;
    let handler: OAuthUpsertApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertApplicationController,
            ],
            providers: [
                {
                    provide : OAuthUpsertApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertApplicationController>(OAuthUpsertApplicationController);
        handler = module.get<OAuthUpsertApplicationHandler>(OAuthUpsertApplicationHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationData[0])));
            expect(await controller.main(oAuthMockApplicationData[0])).toBe(oAuthMockApplicationData[0]);
        });
    });
});
