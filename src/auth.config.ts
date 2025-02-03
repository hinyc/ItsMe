import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
// import log from "logging-service";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.memberId = user.id;
        token.sid = user.id;
      }
      return token;
    },

    session: async ({ session, token }) => {
      try {
        if (!token.sub) {
          return Promise.reject(new Error('Missing token information'));
        }

        session.user.id = token.sub;
        return session;
      } catch (error) {
        console.error('API call error:', error);
        return session;
      }
    }
  }
  // logger: {
  //   error(code, ...message) {
  //     log.error(code, message);
  //   },
  //   warn(code, ...message) {
  //     log.warn(code, message);
  //   },
  //   debug(code, ...message) {
  //     log.debug(code, message);
  //   }
  // }
} satisfies NextAuthConfig;
