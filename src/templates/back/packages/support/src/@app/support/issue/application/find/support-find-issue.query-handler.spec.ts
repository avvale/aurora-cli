import {
    SupportFindIssueQuery,
    SupportIIssueRepository,
    SupportIssueMapper,
    SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportFindIssueQueryHandler } from '@app/support/issue/application/find/support-find-issue.query-handler';
import { SupportFindIssueService } from '@app/support/issue/application/find/support-find-issue.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueQueryHandler', () => {
    let queryHandler: SupportFindIssueQueryHandler;
    let service: SupportFindIssueService;
    let repository: SupportMockIssueRepository;
    let mapper: SupportIssueMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportFindIssueQueryHandler,
                {
                    provide: SupportIIssueRepository,
                    useClass: SupportMockIssueRepository,
                },
                {
                    provide: SupportFindIssueService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<SupportFindIssueQueryHandler>(
            SupportFindIssueQueryHandler,
        );
        service = module.get<SupportFindIssueService>(SupportFindIssueService);
        repository = <SupportMockIssueRepository>(
            module.get<SupportIIssueRepository>(SupportIIssueRepository)
        );
        mapper = new SupportIssueMapper();
    });

    describe('main', () => {
        test('SupportFindIssueQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an issue founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new SupportFindIssueQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
