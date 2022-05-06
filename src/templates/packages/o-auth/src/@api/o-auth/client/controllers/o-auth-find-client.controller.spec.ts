/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindClientController } from './o-auth-find-client.controller';
import { OAuthFindClientHandler } from '../handlers/o-auth-find-client.handler';

// sources
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthFindClientController', () =>
{
    let controller: OAuthFindClientController;
    let handler: OAuthFindClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindClientController,
            ],
            providers: [
                {
                    provide : OAuthFindClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindClientController>(OAuthFindClientController);
        handler = module.get<OAuthFindClientHandler>(OAuthFindClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a client', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main()).toBe(clients[0]);
        });
    });
});