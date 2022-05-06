/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientByIdController } from './o-auth-delete-client-by-id.controller';
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthDeleteClientByIdController', () =>
{
    let controller: OAuthDeleteClientByIdController;
    let handler: OAuthDeleteClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteClientByIdController,
            ],
            providers: [
                {
                    provide : OAuthDeleteClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteClientByIdController>(OAuthDeleteClientByIdController);
        handler = module.get<OAuthDeleteClientByIdHandler>(OAuthDeleteClientByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an client deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0].id)).toBe(clients[0]);
        });
    });
});