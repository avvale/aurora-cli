/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsDeleteWebhookByIdService } from '@app/tools/webhook/application/delete/tools-delete-webhook-by-id.service';
import { ToolsWebhookId } from '@app/tools/webhook/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookByIdService', () => {
    let service: ToolsDeleteWebhookByIdService;
    let repository: ToolsIWebhookRepository;
    let mockRepository: ToolsMockWebhookRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsDeleteWebhookByIdService,
                ToolsMockWebhookRepository,
                {
                    provide: ToolsIWebhookRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsDeleteWebhookByIdService);
        repository = module.get(ToolsIWebhookRepository);
        mockRepository = module.get(ToolsMockWebhookRepository);
    });

    describe('main', () => {
        test('ToolsDeleteWebhookByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete webhook and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new ToolsWebhookId(toolsMockWebhookData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
