import { Module } from '@nestjs/common';
import { SharedModule } from 'src/apps/shared/shared.module';
import { SequelizeConfigModule } from 'src/apps/core/modules/sequelize/sequelize-config.module';
import { {{ toPascalCase schema.boundedContextName }}Module } from 'src/apps/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.boundedContextName }}.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        {{ toPascalCase schema.boundedContextName }}Module
    ]
})
export class SeederModule {}