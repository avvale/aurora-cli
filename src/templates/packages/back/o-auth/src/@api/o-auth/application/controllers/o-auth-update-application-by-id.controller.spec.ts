/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationByIdController } from './o-auth-update-application-by-id.controller';
import { OAuthUpdateApplicationByIdHandler } from '../handlers/o-auth-update-application-by-id.handler';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationByIdController', () =>
{
    let controller: OAuthUpdateApplicationByIdController;
    let handler: OAuthUpdateApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateApplicationByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateApplicationByIdController>(OAuthUpdateApplicationByIdController);
        handler = module.get<OAuthUpdateApplicationByIdHandler>(OAuthUpdateApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0])).toBe(applications[0]);
        });
    });
});