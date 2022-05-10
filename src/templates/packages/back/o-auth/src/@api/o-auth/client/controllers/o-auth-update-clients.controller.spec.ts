/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateClientsController } from './o-auth-update-clients.controller';
import { OAuthUpdateClientsHandler } from '../handlers/o-auth-update-clients.handler';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientsController', () =>
{
    let controller: OAuthUpdateClientsController;
    let handler: OAuthUpdateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateClientsController,
            ],
            providers: [
                {
                    provide : OAuthUpdateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateClientsController>(OAuthUpdateClientsController);
        handler = module.get<OAuthUpdateClientsHandler>(OAuthUpdateClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a clients updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0])).toBe(clients[0]);
        });
    });
});