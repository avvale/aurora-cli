/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindWebhookHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookHandler', () => {
    let handler: ToolsFindWebhookHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindWebhookHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<ToolsFindWebhookHandler>(ToolsFindWebhookHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindWebhookHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindWebhookHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a webhook', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                toolsMockWebhookData[0],
            );
        });
    });
});
