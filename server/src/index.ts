import { ConfigService } from "./config/config.service";
import { Application } from "./core";

const app = new Application(new ConfigService());
app.start();
