/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageIInboxRepository,
    messageMockInboxData,
    MessageMockInboxRepository,
} from '@app/message/inbox';
import { MessageDeleteInboxByIdService } from '@app/message/inbox/application/delete/message-delete-inbox-by-id.service';
import { MessageInboxId } from '@app/message/inbox/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxByIdService', () => {
    let service: MessageDeleteInboxByIdService;
    let repository: MessageIInboxRepository;
    let mockRepository: MessageMockInboxRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageDeleteInboxByIdService,
                MessageMockInboxRepository,
                {
                    provide: MessageIInboxRepository,
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

        service = module.get(MessageDeleteInboxByIdService);
        repository = module.get(MessageIInboxRepository);
        mockRepository = module.get(MessageMockInboxRepository);
    });

    describe('main', () => {
        test('MessageDeleteInboxByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete inbox and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new MessageInboxId(messageMockInboxData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
