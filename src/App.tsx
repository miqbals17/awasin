import { useEffect, useState } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import Heatmap from "./components/heatmap";
import { RiAlertFill } from "@remixicon/react";
import { writeActivityData } from "./lib/realtime-db";
import { reverseGeocoding } from "./lib/utils";

function App() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied or unavailable: ", error);
        }
      );
    }
  }, []);

  const handleReportDemonstration = async () => {
    if (!userLocation) {
      alert("Akses lokasi dibutuhkan untuk melaporkan aktivitas demonstrasi");
      return;
    }

    if (userLocation?.lat === undefined || userLocation?.lng === undefined) {
      alert("Akses lokasi dibutuhkan untuk melaporkan aktivitas demonstrasi");
      return;
    }

    setIsReporting(true);

    try {
      const data = await reverseGeocoding(userLocation?.lat, userLocation?.lng);
      const city = data.address.city;

      const sanitizedCity = city.replace(/\s+/g, "-").toLowerCase();

      await writeActivityData(
        sanitizedCity,
        userLocation?.lat,
        userLocation?.lng
      );

      alert(
        "Terima kasih atas laporan anda. Aktivitas demonstrasi telah ditambahakan."
      );
    } catch (error) {
      console.log("error:", error);
      alert("Gagal untuk menambahkan laporan. Silakan coba lagi.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-stroke-primary bg-background-secondary">
        <div className="p-4 flex flex-col justify-center gap-y-0.5">
          <h1 className="text-lg font-semibold text-content-primary">
            Monitor Aktivitas Demonstrasi
          </h1>
          <p className="text-content-secondary font-normal text-sm">
            Pantau tingkat aktivitas demonstrasi saat ini.
          </p>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-y-4">
        <Card className="bg-background-secondary border-stroke-primary flex flex-col space-y-4">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-base font-semibold text-content-primary">
              Heatmap Aktivitas Demonstrasi
            </h2>
            <p className="text-sm font-normal text-content-secondary">
              Warna lebih gelap menunjukkan tingkat aktivitas yang lebih tinggi.
            </p>
            <p></p>
          </div>
          <div className="w-full h-96 rounded-lg overflow-hidden border border-stroke-primary">
            <Heatmap />
          </div>
        </Card>
        <Card className="bg-background-secondary border-stroke-primary flex flex-col space-y-4">
          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-1 items-center">
              <RiAlertFill size={20} />
              <h2 className="text-base font-semibold text-content-primary">
                Report Activity
              </h2>
            </div>
            <p className="text-sm font-normal text-content-secondary">
              Bantu jaga agar komunitas tetap terinformasi dengan melaporkan
              aktivitas demonstrasi di wilayah Anda.
            </p>
          </div>
          <p className="text-sm font-normal text-content-secondary">
            Lokasi Anda akan digunakan untuk menempatkan laporan secara akurat
            di peta. Semua laporan bersifat anonim dan membantu menciptakan
            komunitas yang lebih aman dan terinformasi.
          </p>
          <Button
            onClick={handleReportDemonstration}
            className="w-full sm:w-auto"
            disabled={!userLocation || isReporting}
          >
            {isReporting ? "Reporting..." : "Laporkan Demonstrasi"}
          </Button>
          {!userLocation && (
            <p className="text-sm font-normal text-content-secondary">
              Silakan izinkan akses lokasi untuk melaporkan aktivitas
              demonstrasi.
            </p>
          )}
        </Card>
      </main>
    </div>
  );
}

export default App;
