import {
    IamIPermissionRepository,
    IamPermission,
    IamPermissionMapper,
    IamPermissionModel,
} from '@app/iam/permission';
import {
    AuditingRunner,
    ICriteria,
    LiteralObject,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizePermissionRepository
    extends SequelizeRepository<IamPermission, IamPermissionModel>
    implements IamIPermissionRepository
{
    public readonly aggregateName: string = 'IamPermission';
    public readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        @InjectModel(IamPermissionModel)
        public readonly repository: typeof IamPermissionModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: IamPermission,
        model: IamPermissionModel,
        createOptions: LiteralObject,
    ): Promise<void> {
        // add many to many relation
        if (aggregate?.roleIds.length > 0) {
            try {
                await model.$add(
                    'roles',
                    aggregate.roleIds.value,
                    createOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: IamPermission,
        model: IamPermissionModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void> {
        // set many to many relation
        if (aggregate?.roleIds.isArray()) {
            try {
                await model.$set(
                    'roles',
                    aggregate.roleIds.value,
                    updateByIdOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }
}
