/* eslint-disable comma-dangle */
import {
  SupportCommentHandlers,
  SupportCommentModel,
  SupportCommentSagas,
  SupportCommentServices,
  SupportICommentRepository,
  SupportSequelizeCommentRepository,
} from './comment';
import {
  SupportIIssueRepository,
  SupportIssueHandlers,
  SupportIssueModel,
  SupportIssueSagas,
  SupportIssueServices,
  SupportSequelizeIssueRepository,
} from './issue';

export const SupportHandlers = [
  ...SupportIssueHandlers,
  ...SupportCommentHandlers,
];
export const SupportServices = [
  ...SupportIssueServices,
  ...SupportCommentServices,
];
export const SupportModels = [SupportIssueModel, SupportCommentModel];
export const SupportRepositories = [
  {
    provide: SupportIIssueRepository,
    useClass: SupportSequelizeIssueRepository,
  },
  {
    provide: SupportICommentRepository,
    useClass: SupportSequelizeCommentRepository,
  },
];
export const SupportSagas = [SupportIssueSagas, SupportCommentSagas];
