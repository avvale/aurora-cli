import {
    SupportCommentMapper,
    SupportFindCommentByIdQuery,
    SupportICommentRepository,
    supportMockCommentData,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportFindCommentByIdQueryHandler } from '@app/support/comment/application/find/support-find-comment-by-id.query-handler';
import { SupportFindCommentByIdService } from '@app/support/comment/application/find/support-find-comment-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentByIdQueryHandler', () => {
    let queryHandler: SupportFindCommentByIdQueryHandler;
    let service: SupportFindCommentByIdService;
    let repository: SupportMockCommentRepository;
    let mapper: SupportCommentMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportFindCommentByIdQueryHandler,
                {
                    provide: SupportICommentRepository,
                    useClass: SupportMockCommentRepository,
                },
                {
                    provide: SupportFindCommentByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<SupportFindCommentByIdQueryHandler>(
            SupportFindCommentByIdQueryHandler,
        );
        service = module.get<SupportFindCommentByIdService>(
            SupportFindCommentByIdService,
        );
        repository = <SupportMockCommentRepository>(
            module.get<SupportICommentRepository>(SupportICommentRepository)
        );
        mapper = new SupportCommentMapper();
    });

    describe('main', () => {
        test('FindCommentByIdQueryHandler should be defined', () => {
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
                await queryHandler.execute(
                    new SupportFindCommentByIdQuery(
                        supportMockCommentData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
