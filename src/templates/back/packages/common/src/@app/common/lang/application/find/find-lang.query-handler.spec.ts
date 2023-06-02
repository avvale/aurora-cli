import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindLangQueryHandler } from './find-lang.query-handler';
import { MockLangRepository } from '@app/common/lang/infrastructure/mock/mock-lang.repository';
import { ILangRepository } from '@app/common/lang/domain/lang.repository';
import { LangMapper } from '@app/common/lang/domain/lang.mapper';
import { FindLangQuery } from './find-lang.query';
import { FindLangService } from './find-lang.service';

describe('FindLangQueryHandler', () =>
{
    let queryHandler: FindLangQueryHandler;
    let service: FindLangService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindLangQueryHandler,
                {
                    provide : ILangRepository,
                    useClass: MockLangRepository,
                },
                {
                    provide : FindLangService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindLangQueryHandler>(FindLangQueryHandler);
        service = module.get<FindLangService>(FindLangService);
        repository = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper = new LangMapper();
    });

    describe('main', () =>
    {
        test('FindLangQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an lang founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindLangQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});