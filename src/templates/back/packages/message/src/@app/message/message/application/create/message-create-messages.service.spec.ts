/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessageCreateMessagesService } from '@app/message/message/application/create/message-create-messages.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessagesService', () =>
{
    let service: MessageCreateMessagesService;
    let mockRepository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCreateMessagesService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageCreateMessagesService);
        mockRepository = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('CreateMessagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create messages and emit event', async () =>
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
