import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSideEffectByIdQueryHandler } from './find-side-effect-by-id.query-handler';
import { MockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.repository';
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';
import { ISideEffectRepository } from '@app/auditing/side-effect/domain/side-effect.repository';
import { SideEffectMapper } from '@app/auditing/side-effect/domain/side-effect.mapper';
import { FindSideEffectByIdQuery } from './find-side-effect-by-id.query';
import { FindSideEffectByIdService } from './find-side-effect-by-id.service';

describe('FindSideEffectByIdQueryHandler', () =>
{
    let queryHandler: FindSideEffectByIdQueryHandler;
    let service: FindSideEffectByIdService;
    let repository: MockSideEffectRepository;
    let mapper: SideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSideEffectByIdQueryHandler,
                {
                    provide : ISideEffectRepository,
                    useClass: MockSideEffectRepository,
                },
                {
                    provide : FindSideEffectByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindSideEffectByIdQueryHandler>(FindSideEffectByIdQueryHandler);
        service         = module.get<FindSideEffectByIdService>(FindSideEffectByIdService);
        repository      = <MockSideEffectRepository>module.get<ISideEffectRepository>(ISideEffectRepository);
        mapper          = new SideEffectMapper();
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
                new FindSideEffectByIdQuery(
                    sideEffects[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});