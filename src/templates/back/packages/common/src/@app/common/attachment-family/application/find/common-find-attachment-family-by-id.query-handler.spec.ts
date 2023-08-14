import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAttachmentFamilyByIdQueryHandler } from './common-find-attachment-family-by-id.query-handler';
import { CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.repository';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonIAttachmentFamilyRepository } from '@app/common/attachment-family/domain/common-attachment-family.repository';
import { CommonAttachmentFamilyMapper } from '@app/common/attachment-family/domain/common-attachment-family.mapper';
import { CommonFindAttachmentFamilyByIdQuery } from './common-find-attachment-family-by-id.query';
import { CommonFindAttachmentFamilyByIdService } from './common-find-attachment-family-by-id.service';

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
