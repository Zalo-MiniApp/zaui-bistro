import { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface Tab<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
  badge?: number | string;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  fullWidth = false,
  className = "",
}: TabsProps<T>) {
  return (
    <div className={cn("rounded-xl bg-white p-1", className)}>
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                "flex items-center justify-center rounded-xl px-2.5 py-2 text-small transition-colors",
                fullWidth ? "w-full" : "w-auto",
                isActive ? "bg-primary !text-white" : "!text-text-secondary",
              )}
              type="button"
            >
              {tab.icon && (
                <span className="mr-2 flex-shrink-0">{tab.icon}</span>
              )}
              <span className="truncate">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "ml-2 rounded-full px-1.5 text-xs",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
