/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsUpdateWebhookByIdService } from '@app/tools/webhook/application/update/tools-update-webhook-by-id.service';
import {
    ToolsWebhookEndpoint,
    ToolsWebhookEvents,
    ToolsWebhookExternalId,
    ToolsWebhookId,
    ToolsWebhookMeta,
    ToolsWebhookName,
    ToolsWebhookRowId,
    ToolsWebhookSecret,
    ToolsWebhookService,
} from '@app/tools/webhook/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookByIdService', () => {
    let service: ToolsUpdateWebhookByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsUpdateWebhookByIdService,
                ToolsMockWebhookRepository,
                {
                    provide: ToolsIWebhookRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsUpdateWebhookByIdService);
    });

    describe('main', () => {
        test('ToolsUpdateWebhookByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a webhook and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new ToolsWebhookId(toolsMockWebhookData[0].id),
                        rowId: new ToolsWebhookRowId(
                            toolsMockWebhookData[0].rowId,
                        ),
                        name: new ToolsWebhookName(
                            toolsMockWebhookData[0].name,
                        ),
                        service: new ToolsWebhookService(
                            toolsMockWebhookData[0].service,
                        ),
                        endpoint: new ToolsWebhookEndpoint(
                            toolsMockWebhookData[0].endpoint,
                        ),
                        externalId: new ToolsWebhookExternalId(
                            toolsMockWebhookData[0].externalId,
                        ),
                        events: new ToolsWebhookEvents(
                            toolsMockWebhookData[0].events,
                        ),
                        secret: new ToolsWebhookSecret(
                            toolsMockWebhookData[0].secret,
                        ),
                        meta: new ToolsWebhookMeta(
                            toolsMockWebhookData[0].meta,
                        ),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
