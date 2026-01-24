/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamIPermissionRepository, IamPermission } from '@app/iam/permission';
import { IamPermissionId } from '@app/iam/permission/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionByIdService {
  constructor(private readonly repository: IamIPermissionRepository) {}

  async main(
    id: IamPermissionId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<IamPermission> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
