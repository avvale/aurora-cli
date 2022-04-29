import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationsController } from './o-auth-create-applications.controller';
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthCreateApplicationsController', () =>
{
    let controller: OAuthCreateApplicationsController;
    let handler: OAuthCreateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthCreateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateApplicationsController>(OAuthCreateApplicationsController);
        handler = module.get<OAuthCreateApplicationsHandler>(OAuthCreateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applications created', async () =>
        {
            expect(await controller.main(applications)).toBe(undefined);
        });
    });
});