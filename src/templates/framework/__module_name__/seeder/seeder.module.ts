import { Module } from '@nestjs/common';
import { SharedModule } from 'src/{{ config.apiContainer }}/shared/shared.module';
import { SequelizeConfigModule } from 'src/{{ config.apiContainer }}/core/modules/sequelize/sequelize-config.module';
import { {{ toPascalCase schema.boundedContextName }}Module } from 'src/{{ config.apiContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.boundedContextName }}.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        {{ toPascalCase schema.boundedContextName }}Module
    ]
})
export class SeederModule {}