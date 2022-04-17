import { signUp } from '../services/auth';

const resolvers = {
    Query: {
        hello: () => {
            console.log('reached');
            return { username: 'test' };
        },
    },
    Mutations: {
        hello2: (root) => {
            return 'hello from hello2';
        },
        async signUp(root, args, context, info) {
            const { input } = root;
            const { password, nick_name, phone, email } = input;
            await signUp({ email, nick_name, password, phone });

            return null;
        },
    },
};

export default resolvers;
