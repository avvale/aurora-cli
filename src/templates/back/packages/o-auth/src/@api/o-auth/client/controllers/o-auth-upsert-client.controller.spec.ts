/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpsertClientController } from './o-auth-upsert-client.controller';
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';

// sources
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

describe('OAuthUpsertClientController', () =>
{
    let controller: OAuthUpsertClientController;
    let handler: OAuthUpsertClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertClientController,
            ],
            providers: [
                {
                    provide : OAuthUpsertClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertClientController>(OAuthUpsertClientController);
        handler = module.get<OAuthUpsertClientHandler>(OAuthUpsertClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an client upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0])).toBe(clients[0]);
        });
    });
});