/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookRepository,
    ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsDeleteWebhooksService } from '@app/tools/webhook/application/delete/tools-delete-webhooks.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhooksService', () => {
    let service: ToolsDeleteWebhooksService;
    let repository: ToolsIWebhookRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsDeleteWebhooksService,
                ToolsMockWebhookRepository,
                {
                    provide: ToolsIWebhookRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsDeleteWebhooksService);
        repository = module.get(ToolsIWebhookRepository);
    });

    describe('main', () => {
        test('ToolsDeleteWebhooksService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete webhook and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
