import {
    SupportCommentMapper,
    SupportFindCommentQuery,
    SupportICommentRepository,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportFindCommentQueryHandler } from '@app/support/comment/application/find/support-find-comment.query-handler';
import { SupportFindCommentService } from '@app/support/comment/application/find/support-find-comment.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentQueryHandler', () => {
    let queryHandler: SupportFindCommentQueryHandler;
    let service: SupportFindCommentService;
    let repository: SupportMockCommentRepository;
    let mapper: SupportCommentMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportFindCommentQueryHandler,
                {
                    provide: SupportICommentRepository,
                    useClass: SupportMockCommentRepository,
                },
                {
                    provide: SupportFindCommentService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<SupportFindCommentQueryHandler>(
            SupportFindCommentQueryHandler,
        );
        service = module.get<SupportFindCommentService>(
            SupportFindCommentService,
        );
        repository = <SupportMockCommentRepository>(
            module.get<SupportICommentRepository>(SupportICommentRepository)
        );
        mapper = new SupportCommentMapper();
    });

    describe('main', () => {
        test('SupportFindCommentQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an comment founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new SupportFindCommentQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
