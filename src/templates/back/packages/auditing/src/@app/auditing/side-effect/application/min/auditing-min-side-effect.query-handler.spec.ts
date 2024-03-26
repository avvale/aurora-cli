import { AuditingISideEffectRepository, AuditingMinSideEffectQuery, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingMinSideEffectQueryHandler } from '@app/auditing/side-effect/application/min/auditing-min-side-effect.query-handler';
import { AuditingMinSideEffectService } from '@app/auditing/side-effect/application/min/auditing-min-side-effect.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingMinSideEffectQueryHandler', () =>
{
    let queryHandler: AuditingMinSideEffectQueryHandler;
    let service: AuditingMinSideEffectService;
    let repository: AuditingMockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingMinSideEffectQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingMinSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingMinSideEffectQueryHandler>(AuditingMinSideEffectQueryHandler);
        service = module.get<AuditingMinSideEffectService>(AuditingMinSideEffectService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingMinSideEffectQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new AuditingMinSideEffectQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
