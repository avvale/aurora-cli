import {
    IamCreatePermissionController,
    IamCreatePermissionHandler,
} from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionController', () => {
    let controller: IamCreatePermissionController;
    let handler: IamCreatePermissionHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamCreatePermissionController],
            providers: [
                {
                    provide: IamCreatePermissionHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreatePermissionController>(
            IamCreatePermissionController,
        );
        handler = module.get<IamCreatePermissionHandler>(
            IamCreatePermissionHandler,
        );
    });

    describe('main', () => {
        test('IamCreatePermissionController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an permission created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(iamMockPermissionData[0])),
            );
            expect(await controller.main(iamMockPermissionData[0])).toBe(
                iamMockPermissionData[0],
            );
        });
    });
});
