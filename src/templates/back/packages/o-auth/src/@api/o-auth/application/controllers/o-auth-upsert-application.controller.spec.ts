/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpsertApplicationController } from './o-auth-upsert-application.controller';
import { OAuthUpsertApplicationHandler } from '../handlers/o-auth-upsert-application.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';

describe('OAuthUpsertApplicationController', () =>
{
    let controller: OAuthUpsertApplicationController;
    let handler: OAuthUpsertApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertApplicationController,
            ],
            providers: [
                {
                    provide : OAuthUpsertApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertApplicationController>(OAuthUpsertApplicationController);
        handler = module.get<OAuthUpsertApplicationHandler>(OAuthUpsertApplicationHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0])).toBe(applications[0]);
        });
    });
});