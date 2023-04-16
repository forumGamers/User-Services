import app from "..";

const port: any = process.env.PORT || 3001;

app.listen(port, () => console.log(`app listening on port ${port}`));
