import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSideEffectQueryHandler } from './find-side-effect.query-handler';
import { MockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.repository';
import { ISideEffectRepository } from '@app/auditing/side-effect/domain/side-effect.repository';
import { SideEffectMapper } from '@app/auditing/side-effect/domain/side-effect.mapper';
import { FindSideEffectQuery } from './find-side-effect.query';
import { FindSideEffectService } from './find-side-effect.service';

describe('FindSideEffectQueryHandler', () =>
{
    let queryHandler: FindSideEffectQueryHandler;
    let service: FindSideEffectService;
    let repository: MockSideEffectRepository;
    let mapper: SideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSideEffectQueryHandler,
                {
                    provide : ISideEffectRepository,
                    useClass: MockSideEffectRepository,
                },
                {
                    provide : FindSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindSideEffectQueryHandler>(FindSideEffectQueryHandler);
        service         = module.get<FindSideEffectService>(FindSideEffectService);
        repository      = <MockSideEffectRepository>module.get<ISideEffectRepository>(ISideEffectRepository);
        mapper          = new SideEffectMapper();
    });

    describe('main', () =>
    {
        test('FindSideEffectQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffect founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSideEffectQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});