/* eslint-disable key-spacing */
import { CommonUpsertLangCommand } from '@app/common/lang';
import { CommonUpsertLangService } from '@app/common/lang/application/upsert/common-upsert-lang.service';
import {
  CommonLangCustomCode,
  CommonLangDir,
  CommonLangId,
  CommonLangIetf,
  CommonLangImage,
  CommonLangIsActive,
  CommonLangIso6392,
  CommonLangIso6393,
  CommonLangName,
  CommonLangSort,
} from '@app/common/lang/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpsertLangCommand)
export class CommonUpsertLangCommandHandler
  implements ICommandHandler<CommonUpsertLangCommand>
{
  constructor(private readonly upsertLangService: CommonUpsertLangService) {}

  async execute(command: CommonUpsertLangCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.upsertLangService.main(
      {
        id: new CommonLangId(command.payload.id),
        name: new CommonLangName(command.payload.name),
        image: new CommonLangImage(command.payload.image),
        iso6392: new CommonLangIso6392(command.payload.iso6392),
        iso6393: new CommonLangIso6393(command.payload.iso6393),
        ietf: new CommonLangIetf(command.payload.ietf),
        customCode: new CommonLangCustomCode(command.payload.customCode),
        dir: new CommonLangDir(command.payload.dir),
        sort: new CommonLangSort(command.payload.sort),
        isActive: new CommonLangIsActive(command.payload.isActive),
      },
      command.cQMetadata,
    );
  }
}
