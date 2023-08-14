import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAttachmentFamiliesQueryHandler } from './common-get-attachment-families.query-handler';
import { CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.repository';
import { CommonIAttachmentFamilyRepository } from '@app/common/attachment-family/domain/common-attachment-family.repository';
import { CommonAttachmentFamilyMapper } from '@app/common/attachment-family/domain/common-attachment-family.mapper';
import { CommonGetAttachmentFamiliesQuery } from './common-get-attachment-families.query';
import { CommonGetAttachmentFamiliesService } from './common-get-attachment-families.service';

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