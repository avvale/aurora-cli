import { IamIPermissionRoleRepository, IamPermissionRole, IamPermissionRoleMapper, IamPermissionsRolesModel } from '@app/iam/permission-role';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizePermissionRoleRepository extends SequelizeRepository<IamPermissionRole, IamPermissionsRolesModel> implements IamIPermissionRoleRepository
{
    public readonly aggregateName: string = 'IamPermissionsRoles';
    public readonly mapper: IamPermissionRoleMapper = new IamPermissionRoleMapper();

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