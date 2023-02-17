import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetSideEffectsQueryHandler } from './get-side-effects.query-handler';
import { MockSideEffectRepository } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.repository';
import { ISideEffectRepository } from '@app/auditing/side-effect/domain/side-effect.repository';
import { SideEffectMapper } from '@app/auditing/side-effect/domain/side-effect.mapper';
import { GetSideEffectsQuery } from './get-side-effects.query';
import { GetSideEffectsService } from './get-side-effects.service';

describe('GetSideEffectsQueryHandler', () =>
{
    let queryHandler: GetSideEffectsQueryHandler;
    let service: GetSideEffectsService;
    let repository: MockSideEffectRepository;
    let mapper: SideEffectMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetSideEffectsQueryHandler,
                {
                    provide : ISideEffectRepository,
                    useClass: MockSideEffectRepository,
                },
                {
                    provide : GetSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetSideEffectsQueryHandler>(GetSideEffectsQueryHandler);
        service         = module.get<GetSideEffectsService>(GetSideEffectsService);
        repository      = <MockSideEffectRepository>module.get<ISideEffectRepository>(ISideEffectRepository);
        mapper          = new SideEffectMapper();
    });

    describe('main', () =>
    {
        test('GetSideEffectsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sideEffects founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetSideEffectsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});