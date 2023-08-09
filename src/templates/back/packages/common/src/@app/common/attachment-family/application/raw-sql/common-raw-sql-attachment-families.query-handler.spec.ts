import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.repository';
import { CommonIAttachmentFamilyRepository } from '@app/common/attachment-family/domain/common-attachment-family.repository';
import { CommonAttachmentFamilyMapper } from '@app/common/attachment-family/domain/common-attachment-family.mapper';
import { CommonRawSQLAttachmentFamiliesQueryHandler } from './common-raw-sql-attachment-families.query-handler';
import { CommonRawSQLAttachmentFamiliesQuery } from './common-raw-sql-attachment-families.query';
import { CommonRawSQLAttachmentFamiliesService } from './common-raw-sql-attachment-families.service';

describe('RawSQLAttachmentFamiliesQueryHandler', () =>
{
    let queryHandler: CommonRawSQLAttachmentFamiliesQueryHandler;
    let service: CommonRawSQLAttachmentFamiliesService;
    let repository: CommonMockAttachmentFamilyRepository;
    let mapper: CommonAttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLAttachmentFamiliesQueryHandler,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useClass: CommonMockAttachmentFamilyRepository,
                },
                {
                    provide : CommonRawSQLAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLAttachmentFamiliesQueryHandler>(CommonRawSQLAttachmentFamiliesQueryHandler);
        service = module.get<CommonRawSQLAttachmentFamiliesService>(CommonRawSQLAttachmentFamiliesService);
        repository = <CommonMockAttachmentFamilyRepository>module.get<CommonIAttachmentFamilyRepository>(CommonIAttachmentFamilyRepository);
        mapper = new CommonAttachmentFamilyMapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLAttachmentFamiliesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamilies founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLAttachmentFamiliesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
