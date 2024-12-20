"use client"

import * as React from "react"
import { CalendarIcon } from 'lucide-react'
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd")}
                  {dateRange.from.getFullYear() !== dateRange.to.getFullYear() && `, ${dateRange.from.getFullYear()}`} -{" "}
                  {format(dateRange.to, dateRange.from.getFullYear() !== dateRange.to.getFullYear() ? "LLL dd, y" : "LLL dd")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="space-y-2 p-2">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="from">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="from"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      {dateRange?.from ? (
                        format(dateRange.from, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange?.from}
                      onSelect={(date) =>
                        onDateRangeChange({
                          from: date,
                          to: dateRange?.to,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="to">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="to"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.to && "text-muted-foreground"
                      )}
                    >
                      {dateRange?.to ? (
                        format(dateRange.to, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange?.to}
                      onSelect={(date) =>
                        onDateRangeChange({
                          from: dateRange?.from,
                          to: date,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

