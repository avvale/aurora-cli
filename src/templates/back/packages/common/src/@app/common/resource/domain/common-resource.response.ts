/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */

export class CommonResourceResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly code: string,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly hasAttachments: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
