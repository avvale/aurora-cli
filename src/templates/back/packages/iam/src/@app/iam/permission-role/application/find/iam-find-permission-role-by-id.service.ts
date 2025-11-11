import {
    IamIPermissionRoleRepository,
    IamPermissionRole,
} from '@app/iam/permission-role';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionRoleByIdService {
    constructor(private readonly repository: IamIPermissionRoleRepository) {}

    async main(
        permissionId: IamPermissionRolePermissionId,
        roleId: IamPermissionRoleRoleId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermissionRole> {
        return await this.repository.findById(undefined, {
            constraint,
            cQMetadata,
            findArguments: {
                permissionId: permissionId.value,
                roleId: roleId.value,
            },
        });
    }
}
