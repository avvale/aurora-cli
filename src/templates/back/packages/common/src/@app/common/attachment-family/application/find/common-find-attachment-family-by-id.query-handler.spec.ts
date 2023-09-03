import { CommonAttachmentFamilyMapper, CommonFindAttachmentFamilyByIdQuery, CommonIAttachmentFamilyRepository, commonMockAttachmentFamilyData, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonFindAttachmentFamilyByIdQueryHandler } from '@app/common/attachment-family/application/find/common-find-attachment-family-by-id.query-handler';
import { CommonFindAttachmentFamilyByIdService } from '@app/common/attachment-family/application/find/common-find-attachment-family-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyByIdQueryHandler', () =>
{
    let queryHandler: CommonFindAttachmentFamilyByIdQueryHandler;
    let service: CommonFindAttachmentFamilyByIdService;
    let repository: CommonMockAttachmentFamilyRepository;
    let mapper: CommonAttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindAttachmentFamilyByIdQueryHandler,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useClass: CommonMockAttachmentFamilyRepository,
                },
                {
                    provide : CommonFindAttachmentFamilyByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindAttachmentFamilyByIdQueryHandler>(CommonFindAttachmentFamilyByIdQueryHandler);
        service = module.get<CommonFindAttachmentFamilyByIdService>(CommonFindAttachmentFamilyByIdService);
        repository = <CommonMockAttachmentFamilyRepository>module.get<CommonIAttachmentFamilyRepository>(CommonIAttachmentFamilyRepository);
        mapper = new CommonAttachmentFamilyMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentFamilyByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamily founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindAttachmentFamilyByIdQuery(
                    commonMockAttachmentFamilyData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
