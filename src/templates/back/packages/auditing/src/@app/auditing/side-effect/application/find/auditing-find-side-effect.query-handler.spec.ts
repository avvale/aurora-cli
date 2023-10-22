import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindSideEffectQueryHandler } from './auditing-find-side-effect.query-handler';
import { AuditingMockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.repository';
import { AuditingISideEffectRepository } from '@app/auditing/side-effect/domain/auditing-side-effect.repository';
import { AuditingSideEffectMapper } from '@app/auditing/side-effect/domain/auditing-side-effect.mapper';
import { AuditingFindSideEffectQuery } from './auditing-find-side-effect.query';
import { AuditingFindSideEffectService } from './auditing-find-side-effect.service';

describe('AuditingFindSideEffectQueryHandler', () =>
{
    let queryHandler: AuditingFindSideEffectQueryHandler;
    let service: AuditingFindSideEffectService;
    let repository: AuditingMockSideEffectRepository;
    let mapper: AuditingSideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingFindSideEffectQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingFindSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingFindSideEffectQueryHandler>(AuditingFindSideEffectQueryHandler);
        service = module.get<AuditingFindSideEffectService>(AuditingFindSideEffectService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
        mapper = new AuditingSideEffectMapper();
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffect founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AuditingFindSideEffectQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
