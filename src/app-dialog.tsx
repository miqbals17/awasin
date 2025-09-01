import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { RiAlertFill } from "@remixicon/react";
import type { UserLocation } from "./App";

interface AppDialogProps {
  handleReportDemonstration: () => void;
  userLocation: UserLocation | null;
  isReporting: boolean;
}

export default function AppDialog({
  handleReportDemonstration,
  userLocation,
  isReporting,
}: AppDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Laporkan Posisi Saya</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-col gap-y-4">
          <DialogTitle className="flex gap-x-1 items-center">
            <RiAlertFill size={20} className="shrink-0" />
            <span>Laporkan Posisi Saya</span>
          </DialogTitle>
          <div className="flex flex-col gap-y-2">
            <Button
              type="button"
              onClick={handleReportDemonstration}
              className="w-full sm:w-auto"
              disabled={!userLocation || isReporting}
            >
              {isReporting ? "Reporting..." : "Lapor"}
            </Button>
            {!userLocation && (
              <p className="text-sm font-normal text-content-secondary">
                Silakan izinkan akses lokasi untuk melaporkan aktivitas
                demonstrasi.
              </p>
            )}
          </div>
          <p className="text-xs text-content-secondary font-normal">
            *) Lokasi Anda akan digunakan untuk menempatkan laporan secara
            akurat di peta. Semua laporan bersifat anonim dan membantu
            menciptakan komunitas yang lebih aman dan terinformasi.
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
