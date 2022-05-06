/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationByIdController } from './o-auth-delete-application-by-id.controller';
import { OAuthDeleteApplicationByIdHandler } from '../handlers/o-auth-delete-application-by-id.handler';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationByIdController', () =>
{
    let controller: OAuthDeleteApplicationByIdController;
    let handler: OAuthDeleteApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteApplicationByIdController,
            ],
            providers: [
                {
                    provide : OAuthDeleteApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteApplicationByIdController>(OAuthDeleteApplicationByIdController);
        handler = module.get<OAuthDeleteApplicationByIdHandler>(OAuthDeleteApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0].id)).toBe(applications[0]);
        });
    });
});