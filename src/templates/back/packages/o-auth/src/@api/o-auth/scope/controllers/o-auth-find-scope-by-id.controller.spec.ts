import {
    OAuthFindScopeByIdController,
    OAuthFindScopeByIdHandler,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeByIdController', () => {
    let controller: OAuthFindScopeByIdController;
    let handler: OAuthFindScopeByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthFindScopeByIdController],
            providers: [
                {
                    provide: OAuthFindScopeByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthFindScopeByIdController>(
            OAuthFindScopeByIdController,
        );
        handler = module.get<OAuthFindScopeByIdHandler>(
            OAuthFindScopeByIdHandler,
        );
    });

    describe('main', () => {
        test('OAuthFindScopeByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an scope by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
            );
            expect(await controller.main(oAuthMockScopeData[0].id)).toBe(
                oAuthMockScopeData[0],
            );
        });
    });
});
