import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema,emitSchemaDefinitionFile } from 'type-graphql'
import { cloudDB, localDB } from "./db";
import { CourseResolver } from "./src/resolvers/CourseResolver";

// import resolvers
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
          CourseResolver
      ]
    })
    await emitSchemaDefinitionFile("./schema.gql", schema);
    const server = new ApolloServer({ schema })
    await server.listen(8080)
    console.log("Server has started!")
  } catch (error) {
    console.log(error)
    console.log('life is hard')
  }
}
main();