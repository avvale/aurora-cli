import { AuditingISideEffectRepository, AuditingMockSideEffectRepository, AuditingRawSQLSideEffectsQuery, AuditingSideEffectMapper } from '@app/auditing/side-effect';
import { AuditingRawSQLSideEffectsQueryHandler } from '@app/auditing/side-effect/application/raw-sql/auditing-raw-sql-side-effects.query-handler';
import { AuditingRawSQLSideEffectsService } from '@app/auditing/side-effect/application/raw-sql/auditing-raw-sql-side-effects.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLSideEffectsQueryHandler', () =>
{
    let queryHandler: AuditingRawSQLSideEffectsQueryHandler;
    let service: AuditingRawSQLSideEffectsService;
    let repository: AuditingMockSideEffectRepository;
    let mapper: AuditingSideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingRawSQLSideEffectsQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingRawSQLSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingRawSQLSideEffectsQueryHandler>(AuditingRawSQLSideEffectsQueryHandler);
        service = module.get<AuditingRawSQLSideEffectsService>(AuditingRawSQLSideEffectsService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
        mapper = new AuditingSideEffectMapper();
    });

    describe('main', () =>
    {
        test('AuditingRawSQLSideEffectsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffects founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AuditingRawSQLSideEffectsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
