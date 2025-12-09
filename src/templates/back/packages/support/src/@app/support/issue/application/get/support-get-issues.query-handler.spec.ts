import {
    SupportGetIssuesQuery,
    SupportIIssueRepository,
    SupportIssueMapper,
    SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportGetIssuesQueryHandler } from '@app/support/issue/application/get/support-get-issues.query-handler';
import { SupportGetIssuesService } from '@app/support/issue/application/get/support-get-issues.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetIssuesQueryHandler', () => {
    let queryHandler: SupportGetIssuesQueryHandler;
    let service: SupportGetIssuesService;
    let repository: SupportMockIssueRepository;
    let mapper: SupportIssueMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportGetIssuesQueryHandler,
                {
                    provide: SupportIIssueRepository,
                    useClass: SupportMockIssueRepository,
                },
                {
                    provide: SupportGetIssuesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<SupportGetIssuesQueryHandler>(
            SupportGetIssuesQueryHandler,
        );
        service = module.get<SupportGetIssuesService>(SupportGetIssuesService);
        repository = <SupportMockIssueRepository>(
            module.get<SupportIIssueRepository>(SupportIIssueRepository)
        );
        mapper = new SupportIssueMapper();
    });

    describe('main', () => {
        test('SupportGetIssuesQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an issues founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new SupportGetIssuesQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
