import { ref, set } from "firebase/database";
import { db } from "./firebase";

async function writeActivityData(lat: number, lng: number): Promise<void> {
  set(ref(db, "activity"), {
    lat: lat,
    lng: lng,
  });
}

export { writeActivityData };
