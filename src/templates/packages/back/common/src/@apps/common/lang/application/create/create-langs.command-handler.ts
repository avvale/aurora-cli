/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLangsCommand } from './create-langs.command';
import { CreateLangsService } from './create-langs.service';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangCustomCode,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateLangsCommand)
export class CreateLangsCommandHandler implements ICommandHandler<CreateLangsCommand>
{
    constructor(
        private readonly createLangsService: CreateLangsService,
    ) {}

    async execute(command: CreateLangsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLangsService.main(
            command.payload
                .map(lang =>
                {
                    return {
                        id: new LangId(lang.id),
                        name: new LangName(lang.name),
                        image: new LangImage(lang.image),
                        iso6392: new LangIso6392(lang.iso6392),
                        iso6393: new LangIso6393(lang.iso6393),
                        ietf: new LangIetf(lang.ietf),
                        customCode: new LangCustomCode(lang.customCode),
                        dir: new LangDir(lang.dir),
                        sort: new LangSort(lang.sort),
                        isActive: new LangIsActive(lang.isActive),
                    };
                }),
            command.cQMetadata,
        );
    }
}