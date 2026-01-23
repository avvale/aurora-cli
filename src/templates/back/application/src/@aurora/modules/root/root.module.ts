import { Module } from '@nestjs/common';
import { CqrsConfigModule } from '../cqrs/cqrs-config.module';

@Module({
  imports: [CqrsConfigModule],
  providers: [],
  exports: [],
})
export class RootModule {}
