import {
    OAuthDeleteScopesController,
    OAuthDeleteScopesHandler,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopesController', () => {
    let controller: OAuthDeleteScopesController;
    let handler: OAuthDeleteScopesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthDeleteScopesController],
            providers: [
                {
                    provide: OAuthDeleteScopesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthDeleteScopesController>(
            OAuthDeleteScopesController,
        );
        handler = module.get<OAuthDeleteScopesHandler>(
            OAuthDeleteScopesHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteScopesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockScopeData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData)),
            );
            expect(await controller.main()).toBe(oAuthMockScopeData);
        });
    });
});
