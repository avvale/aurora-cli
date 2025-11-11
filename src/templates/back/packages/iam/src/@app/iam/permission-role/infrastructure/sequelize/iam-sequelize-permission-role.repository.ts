import {
    IamIPermissionRoleRepository,
    IamPermissionRole,
    IamPermissionRoleMapper,
    IamPermissionRoleModel,
} from '@app/iam/permission-role';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizePermissionRoleRepository
    extends SequelizeRepository<IamPermissionRole, IamPermissionRoleModel>
    implements IamIPermissionRoleRepository
{
    public readonly aggregateName: string = 'IamPermissionRole';
    public readonly mapper: IamPermissionRoleMapper =
        new IamPermissionRoleMapper();

    constructor(
        @InjectModel(IamPermissionRoleModel)
        public readonly repository: typeof IamPermissionRoleModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
