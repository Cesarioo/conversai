"use client"

import { useState, useMemo } from 'react'
import { format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, startOfDay, endOfDay} from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Conversation } from '@/data/sampleConversations'
import { DateRange } from "@/components/ui/date-range-picker"
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

type TimeFrame = 'hourly' | 'daily' | 'weekly' | 'monthly'
type DataPoint = { date: number; total: number; label: string }

interface CallGraphProps {
  conversations: Conversation[]
  dateRange: DateRange | undefined
}

export function CallGraph({ conversations, dateRange }: CallGraphProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily')

  const processData = (conversations: Conversation[], timeFrame: TimeFrame, dateRange: DateRange | undefined): DataPoint[] => {
    if (!dateRange?.from || !dateRange?.to) return []

    const start = startOfDay(dateRange.from)
    const end = endOfDay(dateRange.to)

    let data: Map<string, DataPoint>

    switch (timeFrame) {
      case 'hourly':
        data = new Map(Array.from({ length: 24 }, (_, i) => [
          i.toString().padStart(2, '0'),
          { date: i, total: 0, label: `${i.toString().padStart(2, '0')}:00` }
        ]))
        break
      case 'daily':
        data = new Map(eachDayOfInterval({ start, end }).map(date => [
          format(date, 'yyyy-MM-dd'),
          { date: date.getTime(), total: 0, label: format(date, 'MMM d') }
        ]))
        break
      case 'weekly':
        data = new Map(eachWeekOfInterval({ start, end }).map(date => [
          format(date, 'yyyy-ww'),
          { date: date.getTime(), total: 0, label: `Week of ${format(date, 'MMM d')}` }
        ]))
        break
      case 'monthly':
        data = new Map(eachMonthOfInterval({ start, end }).map(date => [
          format(date, 'yyyy-MM'),
          { date: date.getTime(), total: 0, label: format(date, 'MMM yyyy') }
        ]))
        break
      default:
        return []
    }

    conversations.forEach(conv => {
      const convDate = new Date(conv.start_time_unix_secs * 1000)
      if (convDate >= start && convDate <= end) {
        let key: string
        switch (timeFrame) {
          case 'hourly':
            key = format(convDate, 'HH')
            break
          case 'daily':
            key = format(convDate, 'yyyy-MM-dd')
            break
          case 'weekly':
            key = format(convDate, 'yyyy-ww')
            break
          case 'monthly':
            key = format(convDate, 'yyyy-MM')
            break
          default:
            return
        }
        if (data.has(key)) {
          const point = data.get(key)!
          point.total++
        }
      }
    })

    return Array.from(data.values())
  }

  const data = useMemo(() => processData(conversations, timeFrame, dateRange), [conversations, timeFrame, dateRange])

  return (
    <Card className="h-[400px] w-full">
      <div className="py-4 px-0 h-full flex flex-col">
        <div className="mb-4 flex items-center">
          <div className="space-x-2 ml-2">
            <Button
              variant={timeFrame === 'hourly' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeFrame('hourly')}
            >
              Hourly
            </Button>
            <Button
              variant={timeFrame === 'daily' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeFrame('daily')}
            >
              Daily
            </Button>
            <Button
              variant={timeFrame === 'weekly' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeFrame('weekly')}
            >
              Weekly
            </Button>
            <Button
              variant={timeFrame === 'monthly' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeFrame('monthly')}
            >
              Monthly
            </Button>
          </div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <ChartContainer
            config={{
              total: {
                label: "Total Calls",
                color: "#3b82f6",
              },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data} 
                margin={{ top: 5, right: 25, left: 25, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  interval={timeFrame === 'hourly' ? 3 : 'preserveEnd'}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  tick={{ fontSize: 10 }}
                  tickMargin={15}
                />
                <YAxis domain={[0, 'auto']} dx={-5} />
                <ChartTooltip
                  content={({ active, payload }: TooltipProps<ValueType, NameType>) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as DataPoint;
                      return (
                        <div className="bg-background border rounded p-2 shadow-md">
                          <p className="font-semibold">{data.label}</p>
                          <p>Total Calls: {data.total}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </Card>
  )
}

