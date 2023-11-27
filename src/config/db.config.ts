import "dotenv/config";

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DOCKER_PORT,
  MONGODB_DATABASE,
} = process.env;

export const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`;
