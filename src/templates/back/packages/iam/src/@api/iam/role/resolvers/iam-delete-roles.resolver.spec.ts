/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteRolesHandler, IamDeleteRolesResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesResolver', () => {
    let resolver: IamDeleteRolesResolver;
    let handler: IamDeleteRolesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteRolesResolver,
                {
                    provide: IamDeleteRolesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteRolesResolver>(IamDeleteRolesResolver);
        handler = module.get<IamDeleteRolesHandler>(IamDeleteRolesHandler);
    });

    test('IamDeleteRolesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamDeleteRolesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockRoleData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData)),
            );
            expect(await resolver.main()).toBe(iamMockRoleData);
        });
    });
});
