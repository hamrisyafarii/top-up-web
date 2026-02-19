import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import type {User} from "@/types/user";
import {Loader2, User2} from "lucide-react";

type CardProfileProps = {
  user: User | null;
  isLoading: boolean;
};

const CardProfile = ({isLoading, user}: CardProfileProps) => {
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
                  disabled
                  value={user?.username}
                  placeholder="Your username"
                  className="bg-secondary border-border"
                  maxLength={100}
                />
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="">
                  <Button
                    variant="ghost"
                    disabled
                    className="w-full bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>This feature is currently unavailable</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </main>
  );
};

export default CardProfile;
