import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurora-ts/core';

// custom items
import { PaginateHttpCommunicationsQueryHandler } from './paginate-http-communications.query-handler';
import { MockHttpCommunicationRepository } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.repository';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
import { HttpCommunicationMapper } from '@app/auditing/http-communication/domain/http-communication.mapper';
import { PaginateHttpCommunicationsQuery } from './paginate-http-communications.query';
import { PaginateHttpCommunicationsService } from './paginate-http-communications.service';

describe('PaginateHttpCommunicationsQueryHandler', () =>
{
    let queryHandler: PaginateHttpCommunicationsQueryHandler;
    let service: PaginateHttpCommunicationsService;
    let repository: MockHttpCommunicationRepository;
    let mapper: HttpCommunicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateHttpCommunicationsQueryHandler,
                {
                    provide : IHttpCommunicationRepository,
                    useClass: MockHttpCommunicationRepository,
                },
                {
                    provide : PaginateHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<PaginateHttpCommunicationsQueryHandler>(PaginateHttpCommunicationsQueryHandler);
        service         = module.get<PaginateHttpCommunicationsService>(PaginateHttpCommunicationsService);
        repository      = <MockHttpCommunicationRepository>module.get<IHttpCommunicationRepository>(IHttpCommunicationRepository);
        mapper          = new HttpCommunicationMapper();
    });

    describe('main', () =>
    {
        test('PaginateHttpCommunicationsQueryHandler should be defined', () =>
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
                new PaginateHttpCommunicationsQuery(
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