/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonILangRepository, CommonLang } from '@app/common/lang';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetLangsService {
  constructor(private readonly repository: CommonILangRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonLang[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
