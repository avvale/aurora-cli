import { IamFindRoleController, IamFindRoleHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleController', () => {
    let controller: IamFindRoleController;
    let handler: IamFindRoleHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamFindRoleController],
            providers: [
                {
                    provide: IamFindRoleHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindRoleController>(IamFindRoleController);
        handler = module.get<IamFindRoleHandler>(IamFindRoleHandler);
    });

    describe('main', () => {
        test('IamFindRoleController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a role', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(await controller.main()).toBe(iamMockRoleData[0]);
        });
    });
});
