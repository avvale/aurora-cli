/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamIPermissionRepository, IamPermission } from '@app/iam/permission';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionService {
  constructor(private readonly repository: IamIPermissionRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<IamPermission> {
    return await this.repository.find({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
