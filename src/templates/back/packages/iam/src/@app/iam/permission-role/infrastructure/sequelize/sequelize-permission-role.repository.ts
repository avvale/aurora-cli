import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';
import { PermissionRoleMapper } from '../../domain/permission-role.mapper';
import { IamPermissionsRolesModel } from './sequelize-permissions-roles.model';

@Injectable()
export class SequelizePermissionRoleRepository extends SequelizeRepository<IamPermissionRole, IamPermissionsRolesModel> implements IPermissionRoleRepository
{
    public readonly aggregateName: string = 'IamPermissionsRoles';
    public readonly mapper: PermissionRoleMapper = new PermissionRoleMapper();

    constructor(
        @InjectModel(IamPermissionsRolesModel)
        public readonly repository: typeof IamPermissionsRolesModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}