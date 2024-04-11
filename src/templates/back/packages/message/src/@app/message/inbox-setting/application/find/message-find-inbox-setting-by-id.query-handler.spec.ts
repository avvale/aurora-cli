import { MessageFindInboxSettingByIdQuery, MessageIInboxSettingRepository, MessageInboxSettingMapper, messageMockInboxSettingData, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageFindInboxSettingByIdQueryHandler } from '@app/message/inbox-setting/application/find/message-find-inbox-setting-by-id.query-handler';
import { MessageFindInboxSettingByIdService } from '@app/message/inbox-setting/application/find/message-find-inbox-setting-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingByIdQueryHandler', () =>
{
    let queryHandler: MessageFindInboxSettingByIdQueryHandler;
    let service: MessageFindInboxSettingByIdService;
    let repository: MessageMockInboxSettingRepository;
    let mapper: MessageInboxSettingMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageFindInboxSettingByIdQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageFindInboxSettingByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageFindInboxSettingByIdQueryHandler>(MessageFindInboxSettingByIdQueryHandler);
        service = module.get<MessageFindInboxSettingByIdService>(MessageFindInboxSettingByIdService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
        mapper = new MessageInboxSettingMapper();
    });

    describe('main', () =>
    {
        test('FindInboxSettingByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inboxSetting founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new MessageFindInboxSettingByIdQuery(
                    messageMockInboxSettingData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
