import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
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
    })
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //Runs on login
      if (account.provider == "github") {
        //connect to database
        await connectDB()
        //check if user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          const newuser = new User({
            email: user.email,
            username: user.email.split("@")[0],
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