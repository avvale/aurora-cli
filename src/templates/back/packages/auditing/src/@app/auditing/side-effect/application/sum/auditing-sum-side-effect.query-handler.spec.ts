import { AuditingISideEffectRepository, AuditingMockSideEffectRepository, AuditingSumSideEffectQuery } from '@app/auditing/side-effect';
import { AuditingSumSideEffectQueryHandler } from '@app/auditing/side-effect/application/sum/auditing-sum-side-effect.query-handler';
import { AuditingSumSideEffectService } from '@app/auditing/side-effect/application/sum/auditing-sum-side-effect.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingSumSideEffectQueryHandler', () =>
{
    let queryHandler: AuditingSumSideEffectQueryHandler;
    let service: AuditingSumSideEffectService;
    let repository: AuditingMockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingSumSideEffectQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingSumSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingSumSideEffectQueryHandler>(AuditingSumSideEffectQueryHandler);
        service = module.get<AuditingSumSideEffectService>(AuditingSumSideEffectService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingSumSideEffectQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new AuditingSumSideEffectQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
