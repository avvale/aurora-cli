/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamPermissionDto } from '@api/iam/permission';
import { ApiProperty } from '@nestjs/swagger';

export class IamBoundedContextDto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the bounded context. UUID v4 format, generated automatically on creation. Used as primary key and for references.',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description:
      'Auto-incremented sequential identifier for internal database indexing. Used for ordered retrieval and performance optimization. Unique across all bounded contexts.',
  })
  rowId: number;

  @ApiProperty({
    type: String,
    description:
      'Human-readable name of the bounded context. Used for display purposes in UI and documentation. Should be unique and descriptive of the domain area it represents (e.g., &#x27;Identity and Access Management&#x27;, &#x27;Library Management&#x27;).',
  })
  name: string;

  @ApiProperty({
    type: String,
    description:
      'Root directory path where the bounded context code is located. Typically matches the module structure (e.g., &#x27;iam&#x27;, &#x27;library&#x27;, &#x27;catalog&#x27;). Used by code generation tools and for file organization. Must match actual filesystem structure.',
  })
  root: string;

  @ApiProperty({
    type: Number,
    description:
      'Display order for UI lists and navigation menus. Lower numbers appear first. NULL values are sorted last. Allows manual organization of bounded contexts in administrative interfaces.',
  })
  sort?: number;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if the bounded context is currently active and available. Inactive bounded contexts are hidden from UI and their permissions are not enforced. Use for temporary disabling without deletion.',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: () => [IamPermissionDto],
    description:
      'Collection of permissions associated with this bounded context. Each permission defines access to specific operations within the bounded context&#x27;s modules. Managed through the grid elements manager component.',
  })
  permissions?: IamPermissionDto[];

  @ApiProperty({
    type: String,
    description:
      'Timestamp when the bounded context was created. Automatically set on record creation. Used for audit trail and historical tracking.',
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description:
      'Timestamp when the bounded context was last updated. Automatically updated on any modification. Used for audit trail and change tracking.',
  })
  updatedAt?: string;

  @ApiProperty({
    type: String,
    description:
      'Soft delete timestamp. NULL indicates active record. When set, the bounded context is excluded from normal queries but preserved for audit and recovery purposes. Cascade affects associated permissions.',
  })
  deletedAt?: string;
}
