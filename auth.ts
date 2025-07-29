import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "./lib/mongoClientPromise";
import CredentialsProvider from "next-auth/providers/credentials";
import { userModel } from "./models/user-models";
import { dbConnect } from "./lib/mongo";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),

  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        await dbConnect();
        try {
          const user = await userModel.findOne({ email: credentials?.email });
          if (user) {
            const isMatched = user?.password === credentials?.password;
            if (isMatched) {
              return user;
            } else {
              console.error("Email and password not match");
            }
          } else {
            console.error("user not found");
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
