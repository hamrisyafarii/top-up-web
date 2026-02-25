import {Input} from "@/components/ui/input";

interface UserIdInputProps {
  userId: string;
  zoneId: string;
  onUserIdChange: (value: string) => void;
  onZoneIdChange: (value: string) => void;
  stepNumber?: number;
}

export const UserIdInput = ({
  userId,
  zoneId,
  onUserIdChange,
  onZoneIdChange,
  stepNumber = 1,
}: UserIdInputProps) => {
  return (
    <section className="surface rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          {stepNumber}
        </span>
        <h2 className="font-semibold">Enter User ID</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            User ID
          </label>
          <Input
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
            className="bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Zone ID
          </label>
          <Input
            placeholder="Enter your Zone ID"
            value={zoneId}
            onChange={(e) => onZoneIdChange(e.target.value)}
            className="bg-secondary border-border"
          />
        </div>
      </div>
    </section>
  );
};
