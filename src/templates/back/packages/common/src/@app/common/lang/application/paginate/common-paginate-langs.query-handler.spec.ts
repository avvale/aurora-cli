import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateLangsQueryHandler } from './common-paginate-langs.query-handler';
import { CommonMockLangRepository } from '@app/common/lang/infrastructure/mock/common-mock-lang.repository';
import { CommonILangRepository } from '@app/common/lang/domain/common-lang.repository';
import { CommonLangMapper } from '@app/common/lang/domain/common-lang.mapper';
import { CommonPaginateLangsQuery } from './common-paginate-langs.query';
import { CommonPaginateLangsService } from './common-paginate-langs.service';

describe('CommonPaginateLangsQueryHandler', () =>
{
    let queryHandler: CommonPaginateLangsQueryHandler;
    let service: CommonPaginateLangsService;
    let repository: CommonMockLangRepository;
    let mapper: CommonLangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateLangsQueryHandler,
                {
                    provide : CommonILangRepository,
                    useClass: CommonMockLangRepository,
                },
                {
                    provide : CommonPaginateLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateLangsQueryHandler>(CommonPaginateLangsQueryHandler);
        service = module.get<CommonPaginateLangsService>(CommonPaginateLangsService);
        repository = <CommonMockLangRepository>module.get<CommonILangRepository>(CommonILangRepository);
        mapper = new CommonLangMapper();
    });

    describe('main', () =>
    {
        test('CommonPaginateLangsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an langs paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateLangsQuery(
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