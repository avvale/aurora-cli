import { CommonILangRepository, CommonLang } from '@app/common/lang';
import { CommonLangId } from '@app/common/lang/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindLangByIdService {
  constructor(private readonly repository: CommonILangRepository) {}

  async main(
    id: CommonLangId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonLang> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
