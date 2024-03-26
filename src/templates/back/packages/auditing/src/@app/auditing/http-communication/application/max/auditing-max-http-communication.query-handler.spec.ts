import { AuditingIHttpCommunicationRepository, AuditingMaxHttpCommunicationQuery, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingMaxHttpCommunicationQueryHandler } from '@app/auditing/http-communication/application/max/auditing-max-http-communication.query-handler';
import { AuditingMaxHttpCommunicationService } from '@app/auditing/http-communication/application/max/auditing-max-http-communication.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingMaxHttpCommunicationQueryHandler', () =>
{
    let queryHandler: AuditingMaxHttpCommunicationQueryHandler;
    let service: AuditingMaxHttpCommunicationService;
    let repository: AuditingMockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingMaxHttpCommunicationQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingMaxHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingMaxHttpCommunicationQueryHandler>(AuditingMaxHttpCommunicationQueryHandler);
        service = module.get<AuditingMaxHttpCommunicationService>(AuditingMaxHttpCommunicationService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('AuditingMaxHttpCommunicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new AuditingMaxHttpCommunicationQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
