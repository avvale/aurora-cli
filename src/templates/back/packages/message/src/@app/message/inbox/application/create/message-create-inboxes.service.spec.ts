/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageIInboxRepository,
    MessageMockInboxRepository,
} from '@app/message/inbox';
import { MessageCreateInboxesService } from '@app/message/inbox/application/create/message-create-inboxes.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxesService', () => {
    let service: MessageCreateInboxesService;
    let mockRepository: MessageMockInboxRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageCreateInboxesService,
                MessageMockInboxRepository,
                {
                    provide: MessageIInboxRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(MessageCreateInboxesService);
        mockRepository = module.get(MessageMockInboxRepository);
    });

    describe('main', () => {
        test('CreateInboxesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create inboxes and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
