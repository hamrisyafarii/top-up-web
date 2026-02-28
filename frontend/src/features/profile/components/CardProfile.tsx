import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import type {User} from "@/types/user";
import {Loader2, SaveIcon, User2} from "lucide-react";
import {useState, useEffect} from "react";
import {toast} from "sonner";

type UpdatedProfile = {
  username?: string;
  name?: string;
};

type CardProfileProps = {
  user: User | null;
  isLoading: boolean;
  onUpdate: (data: UpdatedProfile) => Promise<any>;
};

const CardProfile = ({isLoading, user, onUpdate}: CardProfileProps) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setName(user.name || "");
    }
  }, [user]);

  const hasChanges =
    username !== (user?.username || "") || name !== (user?.name || "");

  const handleSave = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      const data: UpdatedProfile = {};
      if (username !== (user?.username || "")) data.username = username;
      if (name !== (user?.name || "")) data.name = name;

      const res = await onUpdate(data);
      toast.success(res.message || "Profile updated successfully");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="surface rounded-xl p-6 space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar || ""} />
                  <AvatarFallback className="bg-secondary text-2xl">
                    <User2 className="h-10 w-10 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Email
                </label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-secondary border-border opacity-60"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Username
                </label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  className="bg-secondary border-border"
                  maxLength={25}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-secondary border-border"
                  maxLength={100}
                />
              </div>
            </div>

            <Button
              disabled={!hasChanges || isSaving}
              onClick={handleSave}
              className="w-full bg-primary hover:bg-primary/90">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <SaveIcon className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CardProfile;
