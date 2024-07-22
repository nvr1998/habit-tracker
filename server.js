import { app } from "./index.js";
import { ConnectToDB } from "./src/Database/db.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
  ConnectToDB();
});
