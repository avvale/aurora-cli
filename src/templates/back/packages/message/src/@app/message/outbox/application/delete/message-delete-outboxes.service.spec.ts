/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIOutboxRepository, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageDeleteOutboxesService } from '@app/message/outbox/application/delete/message-delete-outboxes.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxesService', () =>
{
    let service: MessageDeleteOutboxesService;
    let repository: MessageIOutboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageDeleteOutboxesService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageDeleteOutboxesService);
        repository = module.get(MessageIOutboxRepository);
    });

    describe('main', () =>
    {
        test('MessageDeleteOutboxesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete outbox and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
