import app from "./app";
import config from "./app/config";


async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Server is Running at: http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
