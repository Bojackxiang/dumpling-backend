
const resolvers = {
    Query: {
      hello: () => {
          console.log('reached')
          return {username: 'test'}
      },
    },
    Mutations: {
        hello2: () => {
            return "hello from hello2"
        },
      },
  };

  export default resolvers