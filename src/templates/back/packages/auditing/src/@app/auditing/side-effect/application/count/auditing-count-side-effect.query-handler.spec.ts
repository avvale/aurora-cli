import { AuditingCountSideEffectQuery, AuditingISideEffectRepository, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingCountSideEffectQueryHandler } from '@app/auditing/side-effect/application/count/auditing-count-side-effect.query-handler';
import { AuditingCountSideEffectService } from '@app/auditing/side-effect/application/count/auditing-count-side-effect.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCountSideEffectQueryHandler', () =>
{
    let queryHandler: AuditingCountSideEffectQueryHandler;
    let service: AuditingCountSideEffectService;
    let repository: AuditingMockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCountSideEffectQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingCountSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingCountSideEffectQueryHandler>(AuditingCountSideEffectQueryHandler);
        service = module.get<AuditingCountSideEffectService>(AuditingCountSideEffectService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingCountSideEffectQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new AuditingCountSideEffectQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
