import { AuditingIHttpCommunicationRepository, AuditingMinHttpCommunicationQuery, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingMinHttpCommunicationQueryHandler } from '@app/auditing/http-communication/application/min/auditing-min-http-communication.query-handler';
import { AuditingMinHttpCommunicationService } from '@app/auditing/http-communication/application/min/auditing-min-http-communication.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingMinHttpCommunicationQueryHandler', () =>
{
    let queryHandler: AuditingMinHttpCommunicationQueryHandler;
    let service: AuditingMinHttpCommunicationService;
    let repository: AuditingMockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingMinHttpCommunicationQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingMinHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingMinHttpCommunicationQueryHandler>(AuditingMinHttpCommunicationQueryHandler);
        service = module.get<AuditingMinHttpCommunicationService>(AuditingMinHttpCommunicationService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('AuditingMinHttpCommunicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new AuditingMinHttpCommunicationQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
