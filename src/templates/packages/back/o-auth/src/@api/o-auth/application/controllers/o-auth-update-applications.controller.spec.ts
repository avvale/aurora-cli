/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationsController } from './o-auth-update-applications.controller';
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationsController', () =>
{
    let controller: OAuthUpdateApplicationsController;
    let handler: OAuthUpdateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthUpdateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateApplicationsController>(OAuthUpdateApplicationsController);
        handler = module.get<OAuthUpdateApplicationsHandler>(OAuthUpdateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0])).toBe(applications[0]);
        });
    });
});