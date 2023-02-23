import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindScopeQueryHandler } from './find-scope.query-handler';
import { MockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/mock-scope.repository';
import { IScopeRepository } from '@app/o-auth/scope/domain/scope.repository';
import { ScopeMapper } from '@app/o-auth/scope/domain/scope.mapper';
import { FindScopeQuery } from './find-scope.query';
import { FindScopeService } from './find-scope.service';

describe('FindScopeQueryHandler', () =>
{
    let queryHandler: FindScopeQueryHandler;
    let service: FindScopeService;
    let repository: MockScopeRepository;
    let mapper: ScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindScopeQueryHandler,
                {
                    provide : IScopeRepository,
                    useClass: MockScopeRepository,
                },
                {
                    provide : FindScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindScopeQueryHandler>(FindScopeQueryHandler);
        service         = module.get<FindScopeService>(FindScopeService);
        repository      = <MockScopeRepository>module.get<IScopeRepository>(IScopeRepository);
        mapper          = new ScopeMapper();
    });

    describe('main', () =>
    {
        test('FindScopeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scope founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindScopeQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});