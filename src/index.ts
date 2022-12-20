import * as dotenv from "dotenv";
dotenv.config();

import { Client, create } from "@open-wa/wa-automate";

import handleEvents from "./app";

async function startWaServer() {
  create({
    disableSpins: true,
    useStealth: true,
    skipUpdateCheck: true,
  }).then((client: Client) => handleEvents(client));
}

startWaServer();
