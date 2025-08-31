import { ref, set } from "firebase/database";
import { db } from "./firebase";

async function writeActivityData(
  city: string,
  lat: number,
  lng: number
): Promise<void> {
  set(ref(db, "activity/" + `${city}/` + Date.now()), {
    lat: lat,
    lng: lng,
  });
}

export { writeActivityData };
