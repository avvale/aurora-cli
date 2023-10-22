import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindSideEffectByIdQueryHandler } from './auditing-find-side-effect-by-id.query-handler';
import { AuditingMockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.repository';
import { auditingMockSideEffectData } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.data';
import { AuditingISideEffectRepository } from '@app/auditing/side-effect/domain/auditing-side-effect.repository';
import { AuditingSideEffectMapper } from '@app/auditing/side-effect/domain/auditing-side-effect.mapper';
import { AuditingFindSideEffectByIdQuery } from './auditing-find-side-effect-by-id.query';
import { AuditingFindSideEffectByIdService } from './auditing-find-side-effect-by-id.service';

describe('AuditingFindSideEffectByIdQueryHandler', () =>
{
    let queryHandler: AuditingFindSideEffectByIdQueryHandler;
    let service: AuditingFindSideEffectByIdService;
    let repository: AuditingMockSideEffectRepository;
    let mapper: AuditingSideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingFindSideEffectByIdQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingFindSideEffectByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingFindSideEffectByIdQueryHandler>(AuditingFindSideEffectByIdQueryHandler);
        service = module.get<AuditingFindSideEffectByIdService>(AuditingFindSideEffectByIdService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
        mapper = new AuditingSideEffectMapper();
    });

    describe('main', () =>
    {
        test('FindSideEffectByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffect founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AuditingFindSideEffectByIdQuery(
                    auditingMockSideEffectData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
