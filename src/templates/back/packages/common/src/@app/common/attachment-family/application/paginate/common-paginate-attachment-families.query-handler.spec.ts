import { CommonIAttachmentFamilyRepository, CommonMockAttachmentFamilyRepository, CommonPaginateAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { CommonPaginateAttachmentFamiliesQueryHandler } from '@app/common/attachment-family/application/paginate/common-paginate-attachment-families.query-handler';
import { CommonPaginateAttachmentFamiliesService } from '@app/common/attachment-family/application/paginate/common-paginate-attachment-families.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentFamiliesQueryHandler', () =>
{
    let queryHandler: CommonPaginateAttachmentFamiliesQueryHandler;
    let service: CommonPaginateAttachmentFamiliesService;
    let repository: CommonMockAttachmentFamilyRepository;

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
