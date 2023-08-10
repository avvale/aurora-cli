import { OAuthCreateScopeController, OAuthCreateScopeHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopeController', () =>
{
    let controller: OAuthCreateScopeController;
    let handler: OAuthCreateScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthCreateScopeController,
            ],
            providers: [
                {
                    provide : OAuthCreateScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthCreateScopeController>(OAuthCreateScopeController);
        handler = module.get<OAuthCreateScopeHandler>(OAuthCreateScopeHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(
                await controller.main(
                    oAuthMockScopeData[0],
                ),
            )
                .toBe(oAuthMockScopeData[0]);
        });
    });
});
