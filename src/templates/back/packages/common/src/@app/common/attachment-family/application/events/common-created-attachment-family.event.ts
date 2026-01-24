export class CommonCreatedAttachmentFamilyEvent {
  constructor(
    public readonly id: string,
    public readonly resourceId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly width: number,
    public readonly height: number,
    public readonly fitType: string,
    public readonly quality: number,
    public readonly sizes: any,
    public readonly format: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
