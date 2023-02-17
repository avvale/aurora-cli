/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindHttpCommunicationByIdController } from './auditing-find-http-communication-by-id.controller';
import { AuditingFindHttpCommunicationByIdHandler } from '../handlers/auditing-find-http-communication-by-id.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingFindHttpCommunicationByIdController', () =>
{
    let controller: AuditingFindHttpCommunicationByIdController;
    let handler: AuditingFindHttpCommunicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindHttpCommunicationByIdController,
            ],
            providers: [
                {
                    provide : AuditingFindHttpCommunicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindHttpCommunicationByIdController>(AuditingFindHttpCommunicationByIdController);
        handler = module.get<AuditingFindHttpCommunicationByIdHandler>(AuditingFindHttpCommunicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an httpCommunication by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await controller.main(httpCommunications[0].id)).toBe(httpCommunications[0]);
        });
    });
});