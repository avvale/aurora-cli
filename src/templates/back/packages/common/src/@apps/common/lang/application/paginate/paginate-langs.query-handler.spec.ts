import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { PaginateLangsQueryHandler } from './paginate-langs.query-handler';
import { MockLangRepository } from '@app/common/lang/infrastructure/mock/mock-lang.repository';
import { ILangRepository } from '@app/common/lang/domain/lang.repository';
import { LangMapper } from '@app/common/lang/domain/lang.mapper';
import { PaginateLangsQuery } from './paginate-langs.query';
import { PaginateLangsService } from './paginate-langs.service';

describe('PaginateLangsQueryHandler', () =>
{
    let queryHandler: PaginateLangsQueryHandler;
    let service: PaginateLangsService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateLangsQueryHandler,
                {
                    provide : ILangRepository,
                    useClass: MockLangRepository,
                },
                {
                    provide : PaginateLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateLangsQueryHandler>(PaginateLangsQueryHandler);
        service         = module.get<PaginateLangsService>(PaginateLangsService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new LangMapper();
    });

    describe('main', () =>
    {
        test('PaginateLangsQueryHandler should be defined', () =>
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
                new PaginateLangsQuery(
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