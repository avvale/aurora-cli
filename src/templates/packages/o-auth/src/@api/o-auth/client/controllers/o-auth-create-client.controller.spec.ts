/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateClientController } from './o-auth-create-client.controller';
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';

// sources
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthCreateClientController', () =>
{
    let controller: OAuthCreateClientController;
    let handler: OAuthCreateClientHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthCreateClientController,
            ],
            providers: [
                {
                    provide : OAuthCreateClientHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateClientController>(OAuthCreateClientController);
        handler = module.get<OAuthCreateClientHandler>(OAuthCreateClientHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateClientController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an client created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0])).toBe(clients[0]);
        });
    });
});