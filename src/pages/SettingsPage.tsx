import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Configure your inventory system preferences.</p>
      </div>

      <div className="space-y-4">
        {["General", "Notifications", "Units of Measure", "Categories", "Reordering Rules"].map((section) => (
          <div key={section} className="bg-card rounded-2xl p-6 shadow-ceramic border border-border/50">
            <h3 className="font-semibold mb-2">{section}</h3>
            <p className="text-sm text-muted-foreground">Configure {section.toLowerCase()} settings for your organization.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
