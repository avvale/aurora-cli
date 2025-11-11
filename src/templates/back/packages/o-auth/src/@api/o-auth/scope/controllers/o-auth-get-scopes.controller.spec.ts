import {
    OAuthGetScopesController,
    OAuthGetScopesHandler,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetScopesController', () => {
    let controller: OAuthGetScopesController;
    let handler: OAuthGetScopesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthGetScopesController],
            providers: [
                {
                    provide: OAuthGetScopesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthGetScopesController>(
            OAuthGetScopesController,
        );
        handler = module.get<OAuthGetScopesHandler>(OAuthGetScopesHandler);
    });

    describe('main', () => {
        test('OAuthGetScopesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockScopeData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData)),
            );
            expect(await controller.main()).toBe(oAuthMockScopeData);
        });
    });
});
