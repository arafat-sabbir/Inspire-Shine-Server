import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const main = async () => {
  await mongoose.connect(config.database_url as string);
  console.log("Database connected successfully");
  app.listen(5000, () => {
    console.log(`Example app listening on port ${5000}`);
  });
};
main();
