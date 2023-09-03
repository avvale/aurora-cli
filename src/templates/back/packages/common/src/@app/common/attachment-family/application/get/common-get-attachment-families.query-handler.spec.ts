import { CommonAttachmentFamilyMapper, CommonGetAttachmentFamiliesQuery, CommonIAttachmentFamilyRepository, CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CommonGetAttachmentFamiliesQueryHandler } from '@app/common/attachment-family/application/get/common-get-attachment-families.query-handler';
import { CommonGetAttachmentFamiliesService } from '@app/common/attachment-family/application/get/common-get-attachment-families.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetAttachmentFamiliesQueryHandler', () =>
{
    let queryHandler: CommonGetAttachmentFamiliesQueryHandler;
    let service: CommonGetAttachmentFamiliesService;
    let repository: CommonMockAttachmentFamilyRepository;
    let mapper: CommonAttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonGetAttachmentFamiliesQueryHandler,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useClass: CommonMockAttachmentFamilyRepository,
                },
                {
                    provide : CommonGetAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonGetAttachmentFamiliesQueryHandler>(CommonGetAttachmentFamiliesQueryHandler);
        service = module.get<CommonGetAttachmentFamiliesService>(CommonGetAttachmentFamiliesService);
        repository = <CommonMockAttachmentFamilyRepository>module.get<CommonIAttachmentFamilyRepository>(CommonIAttachmentFamilyRepository);
        mapper = new CommonAttachmentFamilyMapper();
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentFamiliesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamilies founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonGetAttachmentFamiliesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
