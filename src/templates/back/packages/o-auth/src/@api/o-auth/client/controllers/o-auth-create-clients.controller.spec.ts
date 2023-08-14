import { OAuthCreateClientsController, OAuthCreateClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientsController', () =>
{
    let controller: OAuthCreateClientsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateClientsController,
            ],
            providers: [
                {
                    provide : OAuthCreateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthCreateClientsController>(OAuthCreateClientsController);
    });

    describe('main', () =>
    {
        test('OAuthCreateClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockClientData created', async () =>
        {
            expect(
                await controller.main(
                    oAuthMockClientData,
                ),
            )
                .toBe(undefined);
        });
    });
});
