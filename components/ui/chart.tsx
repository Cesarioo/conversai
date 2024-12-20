"use client"

import * as React from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  children: React.ReactNode
  config: ChartConfig
  className?: string
}

export function ChartContainer({
  children,
  config,
  className,
}: ChartContainerProps) {
  // Set CSS variables for chart colors
  React.useEffect(() => {
    Object.entries(config).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value.color)
    })
  }, [config])

  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  content: (props: { active?: boolean; payload?: any[] }) => React.ReactNode;
}

export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>((props, ref) => {
  return props.content(props);
});
ChartTooltip.displayName = "ChartTooltip"
