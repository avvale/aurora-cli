import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AuditingPaginateHttpCommunicationsQueryHandler } from './auditing-paginate-http-communications.query-handler';
import { AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.repository';
import { AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication/domain/auditing-http-communication.repository';
import { AuditingHttpCommunicationMapper } from '@app/auditing/http-communication/domain/auditing-http-communication.mapper';
import { AuditingPaginateHttpCommunicationsQuery } from './auditing-paginate-http-communications.query';
import { AuditingPaginateHttpCommunicationsService } from './auditing-paginate-http-communications.service';

describe('AuditingPaginateHttpCommunicationsQueryHandler', () =>
{
    let queryHandler: AuditingPaginateHttpCommunicationsQueryHandler;
    let service: AuditingPaginateHttpCommunicationsService;
    let repository: AuditingMockHttpCommunicationRepository;
    let mapper: AuditingHttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingPaginateHttpCommunicationsQueryHandler,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useClass: AuditingMockHttpCommunicationRepository,
                },
                {
                    provide : AuditingPaginateHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AuditingPaginateHttpCommunicationsQueryHandler>(AuditingPaginateHttpCommunicationsQueryHandler);
        service = module.get<AuditingPaginateHttpCommunicationsService>(AuditingPaginateHttpCommunicationsService);
        repository = <AuditingMockHttpCommunicationRepository>module.get<AuditingIHttpCommunicationRepository>(AuditingIHttpCommunicationRepository);
        mapper = new AuditingHttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('AuditingPaginateHttpCommunicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an httpCommunications paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AuditingPaginateHttpCommunicationsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
