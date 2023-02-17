import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurora-ts/core';

// custom items
import { PaginateSideEffectsQueryHandler } from './paginate-side-effects.query-handler';
import { MockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.repository';
import { ISideEffectRepository } from '@app/auditing/side-effect/domain/side-effect.repository';
import { SideEffectMapper } from '@app/auditing/side-effect/domain/side-effect.mapper';
import { PaginateSideEffectsQuery } from './paginate-side-effects.query';
import { PaginateSideEffectsService } from './paginate-side-effects.service';

describe('PaginateSideEffectsQueryHandler', () =>
{
    let queryHandler: PaginateSideEffectsQueryHandler;
    let service: PaginateSideEffectsService;
    let repository: MockSideEffectRepository;
    let mapper: SideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateSideEffectsQueryHandler,
                {
                    provide : ISideEffectRepository,
                    useClass: MockSideEffectRepository,
                },
                {
                    provide : PaginateSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateSideEffectsQueryHandler>(PaginateSideEffectsQueryHandler);
        service         = module.get<PaginateSideEffectsService>(PaginateSideEffectsService);
        repository      = <MockSideEffectRepository>module.get<ISideEffectRepository>(ISideEffectRepository);
        mapper          = new SideEffectMapper();
    });

    describe('main', () =>
    {
        test('PaginateSideEffectsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffects paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new PaginateSideEffectsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});