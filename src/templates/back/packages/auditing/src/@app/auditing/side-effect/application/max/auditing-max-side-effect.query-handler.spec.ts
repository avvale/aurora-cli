import { AuditingISideEffectRepository, AuditingMaxSideEffectQuery, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingMaxSideEffectQueryHandler } from '@app/auditing/side-effect/application/max/auditing-max-side-effect.query-handler';
import { AuditingMaxSideEffectService } from '@app/auditing/side-effect/application/max/auditing-max-side-effect.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingMaxSideEffectQueryHandler', () =>
{
    let queryHandler: AuditingMaxSideEffectQueryHandler;
    let service: AuditingMaxSideEffectService;
    let repository: AuditingMockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingMaxSideEffectQueryHandler,
                {
                    provide : AuditingISideEffectRepository,
                    useClass: AuditingMockSideEffectRepository,
                },
                {
                    provide : AuditingMaxSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingMaxSideEffectQueryHandler>(AuditingMaxSideEffectQueryHandler);
        service = module.get<AuditingMaxSideEffectService>(AuditingMaxSideEffectService);
        repository = <AuditingMockSideEffectRepository>module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingMaxSideEffectQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new AuditingMaxSideEffectQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
