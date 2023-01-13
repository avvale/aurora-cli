/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationByIdController } from './o-auth-find-application-by-id.controller';
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthFindApplicationByIdController', () =>
{
    let controller: OAuthFindApplicationByIdController;
    let handler: OAuthFindApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindApplicationByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindApplicationByIdController>(OAuthFindApplicationByIdController);
        handler = module.get<OAuthFindApplicationByIdHandler>(OAuthFindApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0].id)).toBe(applications[0]);
        });
    });
});