import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import FacebookProvider from "next-auth/providers/facebook"
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"

// 1. Define the raw configuration configuration block
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      issuer: "https://www.linkedin.com",
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Runs on login for every available option
      if (
        account.provider == "github" ||
        account.provider == "google" ||
        account.provider == "linkedin" ||
        account.provider == "facebook"
      ) {
        // connect to database
        await connectDB()
        // check if user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          const newuser = new User({
            email: user.email,
            username: user.email ? user.email.split("@")[0] : user.name,
          })
          await newuser.save()
        }
      }
      return true
    },
    async session({ session, user, token }) {
      // Runs whenever session is checked (e.g. useSession())
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      // console.log(dbUser)
      if (dbUser) {
        session.user.name = dbUser.username
        session.user.profilepic = dbUser.profilepic
        session.user.image = dbUser.profilepic || session.user.image
      }
      return session
    }
  }
}


// 2. Initialize the routing wrapper by passing the options block
const handler = NextAuth(authOptions)

// 3. FIX: Export the executable function for both GET and POST requests
export { handler as GET, handler as POST }

/*
In route.js, the session callback modifies the user data before sendin it to the  frontend whenever a 
user logs in or checks their session (e.g., via useSession()).

In Simple Steps:
Finds the user:
 It searches MongoDB for the user with matching email (session.user.email).

Replaces the name with username: 
It sets session.user.name to the username stored in your MongoDB database (instead of the default name from GitHub/OAuth).

Returns the updated session:
 Makes your database username accessible everywhere in your app (like the navbar, dashboard, etc.)

 [ Frontend: useSession() / getSession() ]
                  │
                  ▼
   [ NextAuth API: /api/auth/session ]
                  │
                  ▼
  [ session() Callback in route.js ]
    1. Connects to MongoDB via connectDB()
    2. Searches User collection by session.user.email
    3. Injects custom dbUser.username into session.user.name
    4. Returns updated session object
                  │
                  ▼
[ Client receives enriched session with MongoDB username ]

*/