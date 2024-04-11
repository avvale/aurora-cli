import { MessageIMessageRepository, MessageMockMessageRepository } from '@app/message/message';
import { MessagePaginateMessagesService } from '@app/message/message/application/paginate/message-paginate-messages.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateMessagesService', () =>
{
    let service: MessagePaginateMessagesService;
    let repository: MessageIMessageRepository;
    let mockRepository: MessageMockMessageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessagePaginateMessagesService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessagePaginateMessagesService);
        repository = module.get(MessageIMessageRepository);
        mockRepository = module.get(MessageMockMessageRepository);
    });

    describe('main', () =>
    {
        test('MessagePaginateMessagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate messages', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
