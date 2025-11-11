/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindRoleByIdHandler, IamFindRoleByIdResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleByIdResolver', () => {
    let resolver: IamFindRoleByIdResolver;
    let handler: IamFindRoleByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamFindRoleByIdResolver,
                {
                    provide: IamFindRoleByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindRoleByIdResolver>(IamFindRoleByIdResolver);
        handler = module.get<IamFindRoleByIdHandler>(IamFindRoleByIdHandler);
    });

    test('IamFindRoleByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamFindRoleByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an role by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(await resolver.main(iamMockRoleData[0].id)).toBe(
                iamMockRoleData[0],
            );
        });
    });
});
