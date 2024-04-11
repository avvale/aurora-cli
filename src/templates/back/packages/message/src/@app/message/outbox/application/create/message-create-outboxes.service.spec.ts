/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageCreateOutboxesService } from '@app/message/outbox/application/create/message-create-outboxes.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxesService', () =>
{
    let service: MessageCreateOutboxesService;
    let mockRepository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCreateOutboxesService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCreateOutboxesService);
        mockRepository = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('CreateOutboxesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create outboxes and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
