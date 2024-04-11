/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxRepository, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageDeleteInboxesService } from '@app/message/inbox/application/delete/message-delete-inboxes.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxesService', () =>
{
    let service: MessageDeleteInboxesService;
    let repository: MessageIInboxRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageDeleteInboxesService,
                MessageMockInboxRepository,
                {
                    provide : MessageIInboxRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageDeleteInboxesService);
        repository = module.get(MessageIInboxRepository);
    });

    describe('main', () =>
    {
        test('MessageDeleteInboxesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete inbox and emit event', async () =>
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
