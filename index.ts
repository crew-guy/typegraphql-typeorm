import { RegisterResolver } from './src/modules/user/RegisterResolver';
import { LoginResolver } from './src/modules/user/LoginResolver';
import { MeResolver } from './src/modules/user/MeResolver';
import { ConfirmResolver } from './src/modules/user/ConfirmUserResolver';
import { ForgotPasswordResolver } from 'src/modules/user/ForgotPasswordResolver';

import "reflect-metadata";
import { createConnection } from "typeorm";
import 'module-alias/register';

// Setting up apollo & express server in parallel
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

// For building the GQL schema
import { buildSchema,emitSchemaDefinitionFile } from 'type-graphql'

// For different database connections in diff environments
import { cloudDB, localDB } from "./db";

// Setting up redis
import session from 'express-session'
import connectRedis from 'connect-redis'
import {redis } from './redisdb'

// cors
import cors from 'cors'

// import environment variables
require('dotenv').config()

const defaultConfig = {
  synchronize: true,
  ssl: {
    rejectUnauthorized:false
  },
  logging: true,
  entities: ["src/entity/*.*"]
}


async function main() {
  const dbCredentials = process.env.NODE_ENV !== "development" ? cloudDB : localDB
  const sslVal = process.env.NODE_ENV !== "development" ? {rejectUnauthorized:false}:false
  try {
    const _ = await createConnection({
      ...dbCredentials,
      synchronize: true,
      type: "postgres",
      port: 5432,
      ssl:sslVal,
      logging: true,
      entities: ["src/entity/*.*"]
    })
    const schema = await buildSchema({
      // TODO : Use this to add resolvers
      resolvers: [__dirname + "/src/modules/**/*.ts"],
      // resolvers: [
      //   ConfirmResolver,
      //   MeResolver,
      //   LoginResolver,
      //   RegisterResolver,
      //   ForgotPasswordResolver
      // ],
      authChecker:  ({ context :{req}},roles,) => {
        // here we can read the user from context
        // and check the user's permission in the db against the `roles` argument
        // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
        return !!req.session.userId; // or false if access is denied
      }
    })
    await emitSchemaDefinitionFile("./schema.gql", schema);
    // More required logic for integrating with Express
    
    // Required logic for integrating with Express
    const app = express();
    // Logic for integrating express session with redis
    const RedisStore = connectRedis(session);
    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
      schema,
      context:({req,res}:any)=>({req,res}),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    app.use(cors({
      credentials: true,
      origin: process.env.NODE_ENV ==="development" ? "http://localhost:3000":"*"
    }))

    app.use(
      session({
        store: new RedisStore({
          client: redis as any,
        }),
        name: "qid",
        // TODO : Make this an env var
        secret: "process.env.REDIS_SECRET!",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 3600 * 24 * 7 * 365 // 7 years
        }
      })
    )

    await apolloServer.start();
    apolloServer.applyMiddleware({
      app,
      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/graphql'
    });
    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
  } catch (error) {
    console.log(error)
    console.log('life is hard')
  }
}
main();