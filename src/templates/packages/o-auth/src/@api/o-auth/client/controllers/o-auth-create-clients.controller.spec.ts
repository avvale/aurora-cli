import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateClientsController } from './o-auth-create-clients.controller';
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthCreateClientsController', () =>
{
    let controller: OAuthCreateClientsController;
    let handler: OAuthCreateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateClientsController,
            ],
            providers: [
                {
                    provide : OAuthCreateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthCreateClientsController>(OAuthCreateClientsController);
        handler = module.get<OAuthCreateClientsHandler>(OAuthCreateClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an clients created', async () =>
        {
            expect(await controller.main(clients)).toBe(undefined);
        });
    });
});