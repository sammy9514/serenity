import { app } from "./app";

const port = Number(process.env.PORT ?? 4400);

app.listen(port, () => console.log(`listening on ${port}`));
