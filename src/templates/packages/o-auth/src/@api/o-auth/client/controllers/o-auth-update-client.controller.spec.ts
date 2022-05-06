/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateClientController } from './o-auth-update-client.controller';
import { OAuthUpdateClientHandler } from '../handlers/o-auth-update-client.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientController', () =>
{
    let controller: OAuthUpdateClientController;
    let handler: OAuthUpdateClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateClientController,
            ],
            providers: [
                {
                    provide : OAuthUpdateClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateClientController>(OAuthUpdateClientController);
        handler = module.get<OAuthUpdateClientHandler>(OAuthUpdateClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a client created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0])).toBe(clients[0]);
        });
    });
});