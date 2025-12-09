/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsFindWebhookByIdHandler,
    ToolsFindWebhookByIdResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookByIdResolver', () => {
    let resolver: ToolsFindWebhookByIdResolver;
    let handler: ToolsFindWebhookByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindWebhookByIdResolver,
                {
                    provide: ToolsFindWebhookByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsFindWebhookByIdResolver>(
            ToolsFindWebhookByIdResolver,
        );
        handler = module.get<ToolsFindWebhookByIdHandler>(
            ToolsFindWebhookByIdHandler,
        );
    });

    test('ToolsFindWebhookByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindWebhookByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an webhook by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(await resolver.main(toolsMockWebhookData[0].id)).toBe(
                toolsMockWebhookData[0],
            );
        });
    });
});
