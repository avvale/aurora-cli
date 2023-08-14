import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateAttachmentFamiliesQueryHandler } from './common-paginate-attachment-families.query-handler';
import { CommonMockAttachmentFamilyRepository } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.repository';
import { CommonIAttachmentFamilyRepository } from '@app/common/attachment-family/domain/common-attachment-family.repository';
import { CommonAttachmentFamilyMapper } from '@app/common/attachment-family/domain/common-attachment-family.mapper';
import { CommonPaginateAttachmentFamiliesQuery } from './common-paginate-attachment-families.query';
import { CommonPaginateAttachmentFamiliesService } from './common-paginate-attachment-families.service';

describe('CommonPaginateAttachmentFamiliesQueryHandler', () =>
{
    let queryHandler: CommonPaginateAttachmentFamiliesQueryHandler;
    let service: CommonPaginateAttachmentFamiliesService;
    let repository: CommonMockAttachmentFamilyRepository;
    let mapper: CommonAttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateAttachmentFamiliesQueryHandler,
                {
                    provide : CommonIAttachmentFamilyRepository,
                    useClass: CommonMockAttachmentFamilyRepository,
                },
                {
                    provide : CommonPaginateAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateAttachmentFamiliesQueryHandler>(CommonPaginateAttachmentFamiliesQueryHandler);
        service = module.get<CommonPaginateAttachmentFamiliesService>(CommonPaginateAttachmentFamiliesService);
        repository = <CommonMockAttachmentFamilyRepository>module.get<CommonIAttachmentFamilyRepository>(CommonIAttachmentFamilyRepository);
        mapper = new CommonAttachmentFamilyMapper();
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentFamiliesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamilies paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateAttachmentFamiliesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
