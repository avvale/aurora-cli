/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindWebhookByIdHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookByIdHandler', () => {
    let handler: ToolsFindWebhookByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindWebhookByIdHandler,
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

        handler = module.get<ToolsFindWebhookByIdHandler>(
            ToolsFindWebhookByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindWebhookByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindWebhookByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an webhook by id', async () => {
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
