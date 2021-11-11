export const schema = gql`
  type Test {
    id: Int
    first: String! @skipAuth
    second: Int @skipAuth
  }

  type Query {
    test(id: Int): Test @skipAuth
  }

  type Mutation {
    updateTest(id: Int): Test @skipAuth
  }
`
