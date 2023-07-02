import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';
import { PermissionMapper } from '../../domain/permission.mapper';
import { IamPermissionModel } from './sequelize-permission.model';

@Injectable()
export class SequelizePermissionRepository extends SequelizeRepository<IamPermission, IamPermissionModel> implements IPermissionRepository
{
    public readonly aggregateName: string = 'IamPermission';
    public readonly mapper: PermissionMapper = new PermissionMapper();

    constructor(
        @InjectModel(IamPermissionModel)
        public readonly repository: typeof IamPermissionModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: IamPermission,
        model: IamPermissionModel,
        createOptions: LiteralObject,
    ): Promise<void>
    {
        // add many to many relation
        if (aggregate.roleIds.length > 0)
        {
            await model.$add(
                'roles',
                aggregate.roleIds.value,
                createOptions,
            );
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: IamPermission,
        model: IamPermissionModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void>
    {
        // set many to many relation
        if (aggregate.roleIds.isArray())
        {
            await model.$set(
                'roles',
                aggregate.roleIds.value,
                updateByIdOptions,
            );
        }
    }
}