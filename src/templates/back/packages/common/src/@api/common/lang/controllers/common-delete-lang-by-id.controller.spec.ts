/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteLangByIdHandler } from '../handlers/common-delete-lang-by-id.handler';
import { CommonDeleteLangByIdController } from './common-delete-lang-by-id.controller';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangByIdController', () =>
{
    let controller: CommonDeleteLangByIdController;
    let handler: CommonDeleteLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteLangByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteLangByIdController>(CommonDeleteLangByIdController);
        handler = module.get<CommonDeleteLangByIdHandler>(CommonDeleteLangByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main(langs[0].id)).toBe(langs[0]);
        });
    });
});