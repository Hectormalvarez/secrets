/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSecret = /* GraphQL */ `
  mutation CreateSecret(
    $input: CreateSecretInput!
    $condition: ModelSecretConditionInput
  ) {
    createSecret(input: $input, condition: $condition) {
      id
      secretText
      createdAt
      updatedAt
    }
  }
`;
export const updateSecret = /* GraphQL */ `
  mutation UpdateSecret(
    $input: UpdateSecretInput!
    $condition: ModelSecretConditionInput
  ) {
    updateSecret(input: $input, condition: $condition) {
      id
      secretText
      createdAt
      updatedAt
    }
  }
`;
export const deleteSecret = /* GraphQL */ `
  mutation DeleteSecret(
    $input: DeleteSecretInput!
    $condition: ModelSecretConditionInput
  ) {
    deleteSecret(input: $input, condition: $condition) {
      id
      secretText
      createdAt
      updatedAt
    }
  }
`;
