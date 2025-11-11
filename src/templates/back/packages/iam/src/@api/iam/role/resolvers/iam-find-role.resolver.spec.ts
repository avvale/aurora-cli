/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindRoleHandler, IamFindRoleResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleResolver', () => {
    let resolver: IamFindRoleResolver;
    let handler: IamFindRoleHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindRoleResolver,
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

        resolver = module.get<IamFindRoleResolver>(IamFindRoleResolver);
        handler = module.get<IamFindRoleHandler>(IamFindRoleHandler);
    });

    test('IamFindRoleResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindRoleResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a role', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(await resolver.main()).toBe(iamMockRoleData[0]);
        });
    });
});
