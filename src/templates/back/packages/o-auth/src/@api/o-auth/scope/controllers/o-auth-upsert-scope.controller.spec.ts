import { OAuthUpsertScopeController, OAuthUpsertScopeHandler } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertScopeController', () =>
{
    let controller: OAuthUpsertScopeController;
    let handler: OAuthUpsertScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertScopeController,
            ],
            providers: [
                {
                    provide : OAuthUpsertScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertScopeController>(OAuthUpsertScopeController);
        handler = module.get<OAuthUpsertScopeHandler>(OAuthUpsertScopeHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertScopeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scope upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await controller.main(oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});
