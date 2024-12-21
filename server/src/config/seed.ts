import fs from "fs";
import { createAttack } from "../service/createattackService";
export const createSeed = async () => {
  const data = JSON.parse(
    fs.readFileSync("C:/Users/yisro/Downloads/Test_Sikum_FS/data.json", "utf8")
  );

  for (const item of data) {
    await createAttack(item); // Process each item
  }

  console.log("All data processed.");
};
