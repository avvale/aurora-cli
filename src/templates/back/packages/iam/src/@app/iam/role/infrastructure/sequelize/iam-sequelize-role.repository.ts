import {
    IamIRoleRepository,
    IamRole,
    IamRoleMapper,
    IamRoleModel,
} from '@app/iam/role';
import {
    AuditingRunner,
    ICriteria,
    LiteralObject,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeRoleRepository
    extends SequelizeRepository<IamRole, IamRoleModel>
    implements IamIRoleRepository
{
    public readonly aggregateName: string = 'IamRole';
    public readonly mapper: IamRoleMapper = new IamRoleMapper();

    constructor(
        @InjectModel(IamRoleModel)
        public readonly repository: typeof IamRoleModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: IamRole,
        model: IamRoleModel,
        createOptions: LiteralObject,
    ): Promise<void> {
        // add many to many relation
        if (aggregate?.permissionIds.length > 0) {
            try {
                await model.$add(
                    'permissions',
                    aggregate.permissionIds.value,
                    createOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
        if (aggregate?.accountIds.length > 0) {
            try {
                await model.$add(
                    'accounts',
                    aggregate.accountIds.value,
                    createOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: IamRole,
        model: IamRoleModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void> {
        // set many to many relation
        if (aggregate?.permissionIds.isArray()) {
            try {
                await model.$set(
                    'permissions',
                    aggregate.permissionIds.value,
                    updateByIdOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
        if (aggregate?.accountIds.isArray()) {
            try {
                await model.$set(
                    'accounts',
                    aggregate.accountIds.value,
                    updateByIdOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }
}
