/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIOutboxRepository, messageMockOutboxData, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageDeleteOutboxByIdService } from '@app/message/outbox/application/delete/message-delete-outbox-by-id.service';
import { MessageOutboxId } from '@app/message/outbox/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxByIdService', () =>
{
    let service: MessageDeleteOutboxByIdService;
    let repository: MessageIOutboxRepository;
    let mockRepository: MessageMockOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageDeleteOutboxByIdService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageDeleteOutboxByIdService);
        repository = module.get(MessageIOutboxRepository);
        mockRepository = module.get(MessageMockOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageDeleteOutboxByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete outbox and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new MessageOutboxId(messageMockOutboxData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
