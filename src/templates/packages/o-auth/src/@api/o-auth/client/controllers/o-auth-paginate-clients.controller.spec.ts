/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateClientsController } from './o-auth-paginate-clients.controller';
import { OAuthPaginateClientsHandler } from '../handlers/o-auth-paginate-clients.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthPaginateClientsController', () =>
{
    let controller: OAuthPaginateClientsController;
    let handler: OAuthPaginateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateClientsController,
            ],
            providers: [
                {
                    provide : OAuthPaginateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<OAuthPaginateClientsController>(OAuthPaginateClientsController);
        handler = module.get<OAuthPaginateClientsHandler>(OAuthPaginateClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a clients', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : clients,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : clients,
            });
        });
    });
});