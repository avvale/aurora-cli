// ignored file
export const boundedContexts = [
    {
        id      : '3575595d-1c67-4ed1-b753-19e55cabb2b2',
        name    : 'Message',
        root    : 'message',
        sort    : 60,
        isActive: true,
    },
];

export const permissions = [
    { id: 'c3ca34e4-207b-4016-ba07-9b8905643713',  name: 'message.access',                  boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},

    { id: '415409c7-93e4-4144-a4e6-e1732836bb82',  name: 'message.message.access',          boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '956800af-7b81-46aa-9763-c10df6b4b608',  name: 'message.message.get',             boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '0b54206b-931b-49a6-a8d4-3e8fa653bdfd',  name: 'message.message.create',          boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '78d6b391-f918-4415-b4c8-dffe7ab2d31e',  name: 'message.message.update',          boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'bd820be3-df95-4204-977b-ee8cd450f0d3',  name: 'message.message.upsert',          boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'fcef7892-9960-4588-a810-dfc9a866d9de',  name: 'message.message.delete',          boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},

    { id: '465e970d-2ca2-4761-bdbb-8217ca754dbe',  name: 'message.outbox.access',           boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '6758731b-4d5a-46b8-bebc-56716e23b458',  name: 'message.outbox.get',              boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '5e26c205-3c65-44a9-b810-76c4ddb3e837',  name: 'message.outbox.create',           boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'c34e5758-f9f4-483e-b13f-105b1ba67cb3',  name: 'message.outbox.update',           boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'ba25b821-f6b5-46cf-898e-13c6785290e2',  name: 'message.outbox.upsert',           boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '9548c6c8-e213-45f5-bc2c-90310b9d557b',  name: 'message.outbox.delete',           boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},

    { id: '3badf8bf-9523-4c80-842e-4d0a388cf094',  name: 'message.inbox.access',            boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'db31a791-09a6-41c5-a793-429a56e7ef3b',  name: 'message.inbox.get',               boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'c921dd69-c7ba-4d72-99c1-6c32515930e3',  name: 'message.inbox.create',            boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '320725a6-4e99-455d-92c1-eda06bf497db',  name: 'message.inbox.update',            boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '5e031831-b66f-46f8-988c-e65fe2461578',  name: 'message.inbox.upsert',            boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'd939971a-3646-4317-9e3d-e6e6a83f7cec',  name: 'message.inbox.delete',            boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},

    { id: '7c0b6120-e3c6-45a6-acac-f8d766b67bc7',  name: 'message.inboxSetting.access',     boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '38ca8bee-7186-4cb8-9770-10ad75d4249d',  name: 'message.inboxSetting.get',        boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'f68ce017-9377-444e-99ec-2753a769a9df',  name: 'message.inboxSetting.create',     boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '9e923097-079f-46ae-afde-e08f2b501c7c',  name: 'message.inboxSetting.update',     boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '6ea0080a-5bba-4299-89c1-9491e01a7ece',  name: 'message.inboxSetting.upsert',     boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'a1e96d45-3f59-412f-909a-9b79bbb6d44a',  name: 'message.inboxSetting.delete',     boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},

    { id: 'c0fca51f-976d-48cf-a2cb-3a4335387467',  name: 'message.messageCenter.access',    boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '5e1d9161-e78f-4364-a2b1-476a3778fa1d',  name: 'message.messageCenter.get',       boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'b4e62134-4909-440d-a39a-d5d7df8ad7e0',  name: 'message.messageCenter.update',    boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '2cda5a47-9808-4460-b23e-90a505b87298',  name: 'message.messageCenter.delete',    boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},

    { id: '1b441abf-9fe7-4cab-9b19-65e8b49a3cca',  name: 'message.messageQuickView.access', boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'c52835f3-4e2b-4ff6-8b83-06a029d4e5c1',  name: 'message.messageQuickView.get',    boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: 'bfd7046c-e135-4095-abf1-9c82b178fde9',  name: 'message.messageQuickView.update', boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
    { id: '753cced1-6087-4d5e-b697-f18b7ebbfad5',  name: 'message.messageQuickView.delete', boundedContextId: '3575595d-1c67-4ed1-b753-19e55cabb2b2', roleIds: []},
];
