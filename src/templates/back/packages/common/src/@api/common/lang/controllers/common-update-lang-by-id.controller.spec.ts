/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateLangByIdController } from './common-update-lang-by-id.controller';
import { CommonUpdateLangByIdHandler } from '../handlers/common-update-lang-by-id.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

describe('CommonUpdateLangByIdController', () =>
{
    let controller: CommonUpdateLangByIdController;
    let handler: CommonUpdateLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateLangByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateLangByIdController>(CommonUpdateLangByIdController);
        handler = module.get<CommonUpdateLangByIdHandler>(CommonUpdateLangByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateLangByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a lang updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main(langs[0])).toBe(langs[0]);
        });
    });
});