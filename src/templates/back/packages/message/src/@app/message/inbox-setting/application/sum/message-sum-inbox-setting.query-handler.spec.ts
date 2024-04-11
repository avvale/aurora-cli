import { MessageIInboxSettingRepository, MessageMockInboxSettingRepository, MessageSumInboxSettingQuery } from '@app/message/inbox-setting';
import { MessageSumInboxSettingQueryHandler } from '@app/message/inbox-setting/application/sum/message-sum-inbox-setting.query-handler';
import { MessageSumInboxSettingService } from '@app/message/inbox-setting/application/sum/message-sum-inbox-setting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSumInboxSettingQueryHandler', () =>
{
    let queryHandler: MessageSumInboxSettingQueryHandler;
    let service: MessageSumInboxSettingService;
    let repository: MessageMockInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageSumInboxSettingQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageSumInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageSumInboxSettingQueryHandler>(MessageSumInboxSettingQueryHandler);
        service = module.get<MessageSumInboxSettingService>(MessageSumInboxSettingService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageSumInboxSettingQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new MessageSumInboxSettingQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
