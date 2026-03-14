import { User, Mail, Shield } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account information.</p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-ceramic border border-border/50 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Warehouse Manager</h3>
            <p className="text-sm text-muted-foreground">manager@aura-ims.com</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">manager@aura-ims.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-sm text-muted-foreground">Inventory Manager</p>
            </div>
          </div>
        </div>

        <button className="bg-destructive/10 text-destructive px-5 py-2.5 rounded-xl text-sm font-semibold btn-press transition-all hover:bg-destructive/20">
          Log Out
        </button>
      </div>
    </div>
  );
}
