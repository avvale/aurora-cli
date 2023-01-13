/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetClientsController } from './o-auth-get-clients.controller';
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';

// sources
import { clients } from '@app/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthGetClientsController', () =>
{
    let controller: OAuthGetClientsController;
    let handler: OAuthGetClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetClientsController,
            ],
            providers: [
                {
                    provide : OAuthGetClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetClientsController>(OAuthGetClientsController);
        handler = module.get<OAuthGetClientsHandler>(OAuthGetClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a clients', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await controller.main()).toBe(clients);
        });
    });
});