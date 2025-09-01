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

interface AppDialogPinProps {
  handleReportDemonstration: () => void;
  pinLocation: UserLocation | null;
  isReporting: boolean;
}

export default function AppDialogPin({
  handleReportDemonstration,
  pinLocation,
  isReporting,
}: AppDialogPinProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full sm:w-auto">
          Laporkan Posisi Pin Point
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-col gap-y-4">
          <DialogTitle className="flex gap-x-1 items-center">
            <RiAlertFill size={20} className="shrink-0" />
            <span>Laporkan Pin Point</span>
          </DialogTitle>
          <div className="flex flex-col gap-y-2">
            <Button
              type="button"
              onClick={handleReportDemonstration}
              className="w-full sm:w-auto"
              disabled={!pinLocation || isReporting}
            >
              {isReporting ? "Reporting..." : "Lapor"}
            </Button>
            <p className="text-xs text-content-secondary font-normal">
              *) Semua laporan bersifat anonim dan membantu menciptakan
              komunitas yang lebih aman dan terinformasi.
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
