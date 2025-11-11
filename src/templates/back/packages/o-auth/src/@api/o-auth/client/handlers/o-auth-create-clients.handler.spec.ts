import { OAuthCreateClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientsHandler', () => {
    let handler: OAuthCreateClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientsHandler,
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

        handler = module.get<OAuthCreateClientsHandler>(
            OAuthCreateClientsHandler,
        );
    });

    describe('main', () => {
        test('OAuthCreateClientsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an oAuthMockClientData created', async () => {
            expect(await handler.main(oAuthMockClientData)).toBe(true);
        });
    });
});
