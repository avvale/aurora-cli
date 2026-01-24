import {
  ClickupFolder,
  ClickupList,
  ClickupSpace,
  StorageAccountFileManagerFileUploadedInput,
} from '@api/graphql';
import { Str } from '@aurorajs.dev/core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import { map, Observable } from 'rxjs';

@Injectable()
export class ClickupService {
  apiUrl = 'https://api.clickup.com';

  // spaces
  apiGetSpaces = '/api/v2/team/:teamId/space';

  // folders
  apiGetFolders = '/api/v2/space/:spaceId/folder';

  // lists
  apiGetLists = '/api/v2/folder/:folderId/list';

  // tasks
  apiCreateTask = '/api/v2/list/:listId/task';
  apiGetTask = '/api/v2/task/:taskId';
  apiUpdateTask = '/api/v2/task/:taskId';
  apiDeleteTask = '/api/v2/task/:taskId';

  // attachments
  apiCreateAttachment = '/api/v2/task/:taskId/attachment';

  // comments
  apiCreateTaskComment = '/api/v2/task/:taskId/comment';
  apiUpdateComment = '/api/v2/comment/:commentId';
  apiDeleteComment = '/api/v2/comment/:commentId';

  // webhooks
  apiCreateWebhook = '/api/v2/team/:teamId/webhook';
  apiDeleteWebhook = '/api/v2/webhook/:webhookId';

  constructor(private readonly httpService: HttpService) {}

  getSpaces(
    teamId: string,
    options: { authorization: string },
  ): Observable<ClickupSpace[]> {
    return this.httpService
      .get<{ spaces: ClickupSpace[] }>(
        `${this.apiUrl}${Str.replaceParams(this.apiGetSpaces, { teamId })}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data.spaces));
  }

  createWebhook(
    teamId: string,
    webhook: {
      endpoint: string;
      events: string[];
      spaceId?: number;
      folderId?: number;
      listId?: number;
      taskId?: string;
    },
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService
      .post(
        `${this.apiUrl}${Str.replaceParams(this.apiCreateWebhook, { teamId })}`,
        {
          ...webhook,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  deleteWebhook(
    webhookId: string,
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService
      .delete(
        `${this.apiUrl}${Str.replaceParams(this.apiDeleteWebhook, { webhookId })}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  getFolders(
    spaceId: string,
    options: { authorization: string },
  ): Observable<ClickupFolder[]> {
    return this.httpService
      .get<{ folders: ClickupFolder[] }>(
        `${this.apiUrl}${Str.replaceParams(this.apiGetFolders, { spaceId })}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data.folders));
  }

  getLists(
    folderId: string,
    options: { authorization: string },
  ): Observable<ClickupList[]> {
    return this.httpService
      .get<{ lists: ClickupList[] }>(
        `${this.apiUrl}${Str.replaceParams(this.apiGetLists, { folderId })}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data.lists));
  }

  createTask(
    listId: string,
    task: {
      name: string;
      description?: string;
      status?: string;
      priority?: number;
    },
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService
      .post(
        `${this.apiUrl}${Str.replaceParams(this.apiCreateTask, { listId })}`,
        {
          ...task,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  updateTask(
    taskId: string,
    task: {
      name?: string;
      description?: string;
      status?: string;
      priority?: number;
    },
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService.put(
      `${this.apiUrl}${Str.replaceParams(this.apiUpdateTask, { taskId })}`,
      {
        ...task,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: options.authorization,
        },
      },
    );
  }

  deleteTask(
    taskId: string,
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService.delete(
      `${this.apiUrl}${Str.replaceParams(this.apiDeleteTask, { taskId })}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: options.authorization,
        },
      },
    );
  }

  createAttachment(
    taskId: string,
    attachment: StorageAccountFileManagerFileUploadedInput,
    options: { authorization: string },
  ): Observable<any> {
    // create form data for attachment
    const form = new FormData();
    form.append('attachment', attachment.file.stream, {
      filename: attachment.file.filename,
      contentType: attachment.file.mimetype,
    });

    return this.httpService
      .post(
        `${this.apiUrl}${Str.replaceParams(this.apiCreateAttachment, { taskId })}`,
        form,
        {
          headers: {
            Authorization: options.authorization,
            ...form.getHeaders(),
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        },
      )
      .pipe(map((response) => response.data));
  }

  createTaskComment(
    taskId: string,
    comment: {
      comment: string;
      notifyAll?: boolean;
    },
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService
      .post(
        `${this.apiUrl}${Str.replaceParams(this.apiCreateTaskComment, { taskId })}`,
        {
          comment_text: comment.comment,
          notify_all: comment.notifyAll ?? true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: options.authorization,
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  updateComment(
    commentId: string,
    comment: {
      comment: string;
      assignee?: number;
      groupAssignee?: number;
      resolved: boolean;
    },
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService.put(
      `${this.apiUrl}${Str.replaceParams(this.apiUpdateComment, { commentId })}`,
      {
        comment_text: comment.comment,
        assignee: comment.assignee,
        group_assignee: comment.groupAssignee,
        resolved: comment.resolved ?? false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: options.authorization,
        },
      },
    );
  }

  deleteComment(
    commentId: string,
    options: { authorization: string },
  ): Observable<any> {
    return this.httpService.delete(
      `${this.apiUrl}${Str.replaceParams(this.apiDeleteComment, { commentId })}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: options.authorization,
        },
      },
    );
  }
}
