import gql from 'graphql-tag';

export const getSpacesQuery = gql`
    query ClickupSpaces($teamId: GraphQLString) {
        clickupSpaces(teamId: $teamId) {
            id
            name
        }
    }
`;

export const getFoldersQuery = gql`
    query ClickupFolders($spaceId: GraphQLString) {
        clickupFolders(spaceId: $spaceId) {
            id
            name
        }
    }
`;

export const getListsQuery = gql`
    query ClickupLists($folderId: GraphQLString) {
        clickupLists(folderId: $folderId) {
            id
            name
        }
    }
`;
