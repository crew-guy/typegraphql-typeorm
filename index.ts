import "reflect-metadata";
import { createConnection } from "typeorm";

// Setting up apollo & express server in parallel
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

// 
import { buildSchema,emitSchemaDefinitionFile } from 'type-graphql'
import { cloudDB, localDB } from "./db";

// import resolvers
import { CourseResolver } from "./src/resolvers/CourseResolver";
import { RegisterResolver } from './src/modules/user/Register';

const defaultConfig = {
  synchronize: true,
  ssl: {
    rejectUnauthorized:false
  },
  logging: true,
  entities: ["src/entity/*.*"]
}

async function main() {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  const dbCredentials = process.env.NODE_ENV !== "development" ? cloudDB : localDB
  const sslVal = process.env.NODE_ENV !== "development" ? {rejectUnauthorized:false}:false
  try {
    const connection = await createConnection({
      ...dbCredentials,
      synchronize: true,
      type: "postgres",
      port: 5432,
      ssl:sslVal,
      logging: true,
      entities: ["src/entity/*.*"]
    })
    const schema = await buildSchema({
        resolvers: [
          CourseResolver,
          RegisterResolver
        ]
    })
    await emitSchemaDefinitionFile("./schema.gql", schema);
    const server = new ApolloServer({ schema, plugins:[ApolloServerPluginDrainHttpServer({ httpServer })] })
    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
      app,

      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/'
    });
    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  } catch (error) {
    console.log(error)
    console.log('life is hard')
  }
}
main();