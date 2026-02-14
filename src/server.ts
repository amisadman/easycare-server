import app from "./app";
import { envVars } from "./app/config";

async function main() {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is Running at: http://localhost:${envVars.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
