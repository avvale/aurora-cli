import { AuditingIHttpCommunicationRepository, AuditingMockHttpCommunicationRepository, AuditingSumHttpCommunicationQuery } from '@app/auditing/http-communication';
import { AuditingSumHttpCommunicationQueryHandler } from '@app/auditing/http-communication/application/sum/auditing-sum-http-communication.query-handler';
import { AuditingSumHttpCommunicationService } from '@app/auditing/http-communication/application/sum/auditing-sum-http-communication.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingSumHttpCommunicationQueryHandler', () =>
{
    let queryHandler: AuditingSumHttpCommunicationQueryHandler;
    let service: AuditingSumHttpCommunicationService;
    let repository: AuditingMockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingSumHttpCommunicationQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingSumHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingSumHttpCommunicationQueryHandler>(AuditingSumHttpCommunicationQueryHandler);
        service = module.get<AuditingSumHttpCommunicationService>(AuditingSumHttpCommunicationService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('AuditingSumHttpCommunicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new AuditingSumHttpCommunicationQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
