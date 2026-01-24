import {
  AuditingGetSideEffectsQuery,
  AuditingISideEffectRepository,
  AuditingMockSideEffectRepository,
  AuditingSideEffectMapper,
} from '@app/auditing/side-effect';
import { AuditingGetSideEffectsQueryHandler } from '@app/auditing/side-effect/application/get/auditing-get-side-effects.query-handler';
import { AuditingGetSideEffectsService } from '@app/auditing/side-effect/application/get/auditing-get-side-effects.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetSideEffectsQueryHandler', () => {
  let queryHandler: AuditingGetSideEffectsQueryHandler;
  let service: AuditingGetSideEffectsService;
  let repository: AuditingMockSideEffectRepository;
  let mapper: AuditingSideEffectMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditingGetSideEffectsQueryHandler,
        {
          provide: AuditingISideEffectRepository,
          useClass: AuditingMockSideEffectRepository,
        },
        {
          provide: AuditingGetSideEffectsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<AuditingGetSideEffectsQueryHandler>(
      AuditingGetSideEffectsQueryHandler,
    );
    service = module.get<AuditingGetSideEffectsService>(
      AuditingGetSideEffectsService,
    );
    repository = <AuditingMockSideEffectRepository>(
      module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository)
    );
    mapper = new AuditingSideEffectMapper();
  });

  describe('main', () => {
    test('AuditingGetSideEffectsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an sideEffects founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new AuditingGetSideEffectsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
