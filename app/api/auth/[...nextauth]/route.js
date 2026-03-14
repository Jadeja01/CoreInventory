import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

const handler = NextAuth({

 providers:[

  CredentialsProvider({

   name:"Credentials",

   credentials:{
    email:{},
    password:{}
   },

   async authorize(credentials){

    await connectDB();

    const user = await User.findOne({
     email: credentials.email
    });

    if(!user){
     throw new Error("User not found");
    }

    if(user.password !== credentials.password){
     throw new Error("Invalid password");
    }

    return {
     id:user._id,
     name:user.name,
     email:user.email,
     role:user.role
    };

   }

  })

 ],

 session:{
  strategy:"jwt"
 },

 callbacks:{

  async jwt({token,user}){

   if(user){
    token.role = user.role;
   }

   return token;
  },

  async session({session,token}){

   session.user.role = token.role;

   return session;
  }

 }

});

export {handler as GET,handler as POST};