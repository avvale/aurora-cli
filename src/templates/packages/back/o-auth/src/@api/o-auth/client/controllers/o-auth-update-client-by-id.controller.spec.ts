/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateClientByIdController } from './o-auth-update-client-by-id.controller';
import { OAuthUpdateClientByIdHandler } from '../handlers/o-auth-update-client-by-id.handler';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthUpdateClientByIdController', () =>
{
    let controller: OAuthUpdateClientByIdController;
    let handler: OAuthUpdateClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateClientByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateClientByIdController>(OAuthUpdateClientByIdController);
        handler = module.get<OAuthUpdateClientByIdHandler>(OAuthUpdateClientByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientByIdController should be defined', () =>
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