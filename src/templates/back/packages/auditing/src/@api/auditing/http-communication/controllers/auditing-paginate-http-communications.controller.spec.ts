/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingPaginateHttpCommunicationsController } from './auditing-paginate-http-communications.controller';
import { AuditingPaginateHttpCommunicationsHandler } from '../handlers/auditing-paginate-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingPaginateHttpCommunicationsController', () =>
{
    let controller: AuditingPaginateHttpCommunicationsController;
    let handler: AuditingPaginateHttpCommunicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingPaginateHttpCommunicationsController,
            ],
            providers: [
                {
                    provide : AuditingPaginateHttpCommunicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingPaginateHttpCommunicationsController>(AuditingPaginateHttpCommunicationsController);
        handler = module.get<AuditingPaginateHttpCommunicationsHandler>(AuditingPaginateHttpCommunicationsHandler);
    });

    describe('main', () =>
    {
        test('AuditingPaginateHttpCommunicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a httpCommunications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : httpCommunications,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : httpCommunications,
            });
        });
    });
});