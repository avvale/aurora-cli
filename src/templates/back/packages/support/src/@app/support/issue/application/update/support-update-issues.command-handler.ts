/* eslint-disable key-spacing */
import { SupportUpdateIssuesCommand } from '@app/support/issue';
import { SupportUpdateIssuesService } from '@app/support/issue/application/update/support-update-issues.service';
import {
    SupportIssueAccountId,
    SupportIssueAccountUsername,
    SupportIssueAttachments,
    SupportIssueBackEnvironment,
    SupportIssueBackVersion,
    SupportIssueDescription,
    SupportIssueDisplayName,
    SupportIssueExternalColorStatus,
    SupportIssueExternalId,
    SupportIssueExternalStatus,
    SupportIssueFrontEnvironment,
    SupportIssueFrontVersion,
    SupportIssueId,
    SupportIssueMeta,
    SupportIssueScreenRecording,
    SupportIssueSubject,
} from '@app/support/issue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportUpdateIssuesCommand)
export class SupportUpdateIssuesCommandHandler
    implements ICommandHandler<SupportUpdateIssuesCommand>
{
    constructor(
        private readonly updateIssuesService: SupportUpdateIssuesService,
    ) {}

    async execute(command: SupportUpdateIssuesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateIssuesService.main(
            {
                id: new SupportIssueId(command.payload.id, {
                    undefinable: true,
                }),
                externalId: new SupportIssueExternalId(
                    command.payload.externalId,
                ),
                externalStatus: new SupportIssueExternalStatus(
                    command.payload.externalStatus,
                ),
                externalColorStatus: new SupportIssueExternalColorStatus(
                    command.payload.externalColorStatus,
                ),
                accountId: new SupportIssueAccountId(command.payload.accountId),
                accountUsername: new SupportIssueAccountUsername(
                    command.payload.accountUsername,
                ),
                displayName: new SupportIssueDisplayName(
                    command.payload.displayName,
                ),
                frontEnvironment: new SupportIssueFrontEnvironment(
                    command.payload.frontEnvironment,
                ),
                frontVersion: new SupportIssueFrontVersion(
                    command.payload.frontVersion,
                ),
                backEnvironment: new SupportIssueBackEnvironment(
                    command.payload.backEnvironment,
                ),
                backVersion: new SupportIssueBackVersion(
                    command.payload.backVersion,
                ),
                subject: new SupportIssueSubject(command.payload.subject, {
                    undefinable: true,
                }),
                description: new SupportIssueDescription(
                    command.payload.description,
                    { undefinable: true },
                ),
                attachments: new SupportIssueAttachments(
                    command.payload.attachments,
                ),
                screenRecording: new SupportIssueScreenRecording(
                    command.payload.screenRecording,
                ),
                meta: new SupportIssueMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
