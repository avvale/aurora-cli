/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientsController } from './o-auth-delete-clients.controller';
import { OAuthDeleteClientsHandler } from '../handlers/o-auth-delete-clients.handler';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthDeleteClientsController', () =>
{
    let controller: OAuthDeleteClientsController;
    let handler: OAuthDeleteClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteClientsController,
            ],
            providers: [
                {
                    provide : OAuthDeleteClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteClientsController>(OAuthDeleteClientsController);
        handler = module.get<OAuthDeleteClientsHandler>(OAuthDeleteClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an clients deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await controller.main()).toBe(clients);
        });
    });
});