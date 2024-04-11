import { MessageFindInboxSettingQuery, MessageIInboxSettingRepository, MessageInboxSettingMapper, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageFindInboxSettingQueryHandler } from '@app/message/inbox-setting/application/find/message-find-inbox-setting.query-handler';
import { MessageFindInboxSettingService } from '@app/message/inbox-setting/application/find/message-find-inbox-setting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingQueryHandler', () =>
{
    let queryHandler: MessageFindInboxSettingQueryHandler;
    let service: MessageFindInboxSettingService;
    let repository: MessageMockInboxSettingRepository;
    let mapper: MessageInboxSettingMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageFindInboxSettingQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageFindInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageFindInboxSettingQueryHandler>(MessageFindInboxSettingQueryHandler);
        service = module.get<MessageFindInboxSettingService>(MessageFindInboxSettingService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
        mapper = new MessageInboxSettingMapper();
    });

    describe('main', () =>
    {
        test('MessageFindInboxSettingQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inboxSetting founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new MessageFindInboxSettingQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
