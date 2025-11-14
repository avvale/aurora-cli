import {
    AuditingISideEffectRepository,
    AuditingMockSideEffectRepository,
    AuditingPaginateSideEffectsQuery,
} from '@app/auditing/side-effect';
import { AuditingPaginateSideEffectsQueryHandler } from '@app/auditing/side-effect/application/paginate/auditing-paginate-side-effects.query-handler';
import { AuditingPaginateSideEffectsService } from '@app/auditing/side-effect/application/paginate/auditing-paginate-side-effects.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateSideEffectsQueryHandler', () => {
    let queryHandler: AuditingPaginateSideEffectsQueryHandler;
    let service: AuditingPaginateSideEffectsService;
    let repository: AuditingMockSideEffectRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingPaginateSideEffectsQueryHandler,
                {
                    provide: AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide: AuditingPaginateSideEffectsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<AuditingPaginateSideEffectsQueryHandler>(
            AuditingPaginateSideEffectsQueryHandler,
        );
        service = module.get<AuditingPaginateSideEffectsService>(
            AuditingPaginateSideEffectsService,
        );
        repository = <AuditingMockSideEffectRepository>(
            module.get<AuditingISideEffectRepository>(
                AuditingISideEffectRepository,
            )
        );
    });

    describe('main', () => {
        test('AuditingPaginateSideEffectsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffects paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new AuditingPaginateSideEffectsQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});
