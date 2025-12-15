/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsFindWebhookLogByIdHandler,
    ToolsFindWebhookLogByIdResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogByIdResolver', () => {
    let resolver: ToolsFindWebhookLogByIdResolver;
    let handler: ToolsFindWebhookLogByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindWebhookLogByIdResolver,
                {
                    provide: ToolsFindWebhookLogByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsFindWebhookLogByIdResolver>(
            ToolsFindWebhookLogByIdResolver,
        );
        handler = module.get<ToolsFindWebhookLogByIdHandler>(
            ToolsFindWebhookLogByIdHandler,
        );
    });

    test('ToolsFindWebhookLogByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindWebhookLogByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an webhookLog by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(await resolver.main(toolsMockWebhookLogData[0].id)).toBe(
                toolsMockWebhookLogData[0],
            );
        });
    });
});
