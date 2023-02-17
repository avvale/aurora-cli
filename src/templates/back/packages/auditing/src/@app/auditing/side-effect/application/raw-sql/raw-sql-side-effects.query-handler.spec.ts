import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.repository';
import { ISideEffectRepository } from '@app/auditing/side-effect/domain/side-effect.repository';
import { SideEffectMapper } from '@app/auditing/side-effect/domain/side-effect.mapper';
import { RawSQLSideEffectsQueryHandler } from './raw-sql-side-effects.query-handler';
import { RawSQLSideEffectsQuery } from './raw-sql-side-effects.query';
import { RawSQLSideEffectsService } from './raw-sql-side-effects.service';

describe('RawSQLSideEffectsQueryHandler', () =>
{
    let queryHandler: RawSQLSideEffectsQueryHandler;
    let service: RawSQLSideEffectsService;
    let repository: MockSideEffectRepository;
    let mapper: SideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLSideEffectsQueryHandler,
                {
                    provide : ISideEffectRepository,
                    useClass: MockSideEffectRepository,
                },
                {
                    provide : RawSQLSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLSideEffectsQueryHandler>(RawSQLSideEffectsQueryHandler);
        service         = module.get<RawSQLSideEffectsService>(RawSQLSideEffectsService);
        repository      = <MockSideEffectRepository>module.get<ISideEffectRepository>(ISideEffectRepository);
        mapper          = new SideEffectMapper();
    });

    describe('main', () =>
    {
        test('RawSQLSideEffectsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffects founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLSideEffectsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});