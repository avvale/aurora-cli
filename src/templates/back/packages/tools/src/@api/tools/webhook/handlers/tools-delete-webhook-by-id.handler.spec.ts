/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteWebhookByIdHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookByIdController', () => {
    let handler: ToolsDeleteWebhookByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteWebhookByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
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

        handler = module.get<ToolsDeleteWebhookByIdHandler>(
            ToolsDeleteWebhookByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('ToolsDeleteWebhookByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an webhook deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(
                await handler.main(
                    toolsMockWebhookData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(toolsMockWebhookData[0]);
        });
    });
});
