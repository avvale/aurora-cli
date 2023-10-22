import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingMockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.repository';
import { AuditingISideEffectRepository } from '@app/auditing/side-effect/domain/auditing-side-effect.repository';
import { AuditingSideEffectMapper } from '@app/auditing/side-effect/domain/auditing-side-effect.mapper';
import { AuditingRawSQLSideEffectsQueryHandler } from './auditing-raw-sql-side-effects.query-handler';
import { AuditingRawSQLSideEffectsQuery } from './auditing-raw-sql-side-effects.query';
import { AuditingRawSQLSideEffectsService } from './auditing-raw-sql-side-effects.service';

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
