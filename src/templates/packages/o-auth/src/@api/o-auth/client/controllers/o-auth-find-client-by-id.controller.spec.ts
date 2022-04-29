/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindClientByIdController } from './o-auth-find-client-by-id.controller';
import { OAuthFindClientByIdHandler } from '../handlers/o-auth-find-client-by-id.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthFindClientByIdController', () =>
{
    let controller: OAuthFindClientByIdController;
    let handler: OAuthFindClientByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindClientByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindClientByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthFindClientByIdController>(OAuthFindClientByIdController);
        handler = module.get<OAuthFindClientByIdHandler>(OAuthFindClientByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindClientByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an client by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0].id)).toBe(clients[0]);
        });
    });
});