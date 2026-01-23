import { Global, Module } from '@nestjs/common';
import { SchemaStoreService } from './schema-store.service';

@Global()
@Module({
  providers: [SchemaStoreService],
  exports: [SchemaStoreService],
})
export class SchemaStoreModule {}
