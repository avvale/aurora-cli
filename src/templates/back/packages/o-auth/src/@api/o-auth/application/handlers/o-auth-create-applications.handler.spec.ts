import { OAuthCreateApplicationsHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsHandler', () => {
    let handler: OAuthCreateApplicationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsHandler,
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<OAuthCreateApplicationsHandler>(
            OAuthCreateApplicationsHandler,
        );
    });

    describe('main', () => {
        test('OAuthCreateApplicationsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an oAuthMockApplicationData created', async () => {
            expect(await handler.main(oAuthMockApplicationData)).toBe(true);
        });
    });
});
