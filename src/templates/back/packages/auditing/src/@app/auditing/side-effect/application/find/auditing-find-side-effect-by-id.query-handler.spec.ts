import {
    AuditingFindSideEffectByIdQuery,
    AuditingISideEffectRepository,
    auditingMockSideEffectData,
    AuditingMockSideEffectRepository,
    AuditingSideEffectMapper,
} from '@app/auditing/side-effect';
import { AuditingFindSideEffectByIdQueryHandler } from '@app/auditing/side-effect/application/find/auditing-find-side-effect-by-id.query-handler';
import { AuditingFindSideEffectByIdService } from '@app/auditing/side-effect/application/find/auditing-find-side-effect-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectByIdQueryHandler', () => {
    let queryHandler: AuditingFindSideEffectByIdQueryHandler;
    let service: AuditingFindSideEffectByIdService;
    let repository: AuditingMockSideEffectRepository;
    let mapper: AuditingSideEffectMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingFindSideEffectByIdQueryHandler,
                {
                    provide: AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide: AuditingFindSideEffectByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<AuditingFindSideEffectByIdQueryHandler>(
            AuditingFindSideEffectByIdQueryHandler,
        );
        service = module.get<AuditingFindSideEffectByIdService>(
            AuditingFindSideEffectByIdService,
        );
        repository = <AuditingMockSideEffectRepository>(
            module.get<AuditingISideEffectRepository>(
                AuditingISideEffectRepository,
            )
        );
        mapper = new AuditingSideEffectMapper();
    });

    describe('main', () => {
        test('FindSideEffectByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffect founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new AuditingFindSideEffectByIdQuery(
                        auditingMockSideEffectData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
