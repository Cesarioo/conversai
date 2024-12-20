"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CallHeatmap } from './CallHeatmap'
import { CallGraph } from './CallGraph'
import { Clock, PhoneCall, Timer } from 'lucide-react'
import { CircularProgress } from './CircularProgress'
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "./DateRangePicker"
import { addDays, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'
import { DateRange } from "@/components/ui/date-range-picker"
import { useConversations } from '../contexts/ConversationsContext'

export function AgentDashboard() {
  const { conversations, isLoading, error, refetch } = useConversations()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfDay(addDays(new Date(), -30)),
    to: endOfDay(new Date())
  })

  const handleDateRangeSelect = (range: 'today' | 'week' | 'month' | 'year') => {
    const now = new Date()
    switch (range) {
      case 'today':
        setDateRange({ from: startOfDay(now), to: endOfDay(now) })
        break
      case 'week':
        setDateRange({ from: startOfWeek(now), to: endOfWeek(now) })
        break
      case 'month':
        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) })
        break
      case 'year':
        setDateRange({ from: startOfYear(now), to: endOfYear(now) })
        break
    }
  }

  const filteredConversations = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return conversations;
    return conversations.filter(conv => {
      const convDate = new Date(conv.start_time_unix_secs * 1000)
      return convDate >= dateRange.from && convDate <= dateRange.to
    })
  }, [conversations, dateRange])

  const stats = useMemo(() => {
    const totalCalls = filteredConversations.length
    const successfulCalls = filteredConversations.filter(c => c.call_successful === "success").length
    const totalDuration = filteredConversations.reduce((sum, c) => sum + c.call_duration_secs, 0)
    const averageDuration = totalCalls > 0 ? totalDuration / totalCalls : 0
    const serviceLevel = totalCalls > 0 ? (successfulCalls / totalCalls) * 100 : 0

    return {
      totalCalls,
      successfulCalls,
      unsuccessfulCalls: totalCalls - successfulCalls,
      totalDuration,
      averageDuration,
      serviceLevel
    }
  }, [filteredConversations])

  const heatmapData = useMemo(() => {
    const data: number[][] = Array(7).fill(0).map(() => Array(24).fill(0))
    filteredConversations.forEach(conv => {
      const date = new Date(conv.start_time_unix_secs * 1000)
      const dayIndex = date.getDay()
      const hourIndex = date.getHours()
      data[dayIndex][hourIndex]++
    })
    return data
  }, [filteredConversations])

  if (isLoading) {
    return <div>Loading dashboard data...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-2 sm:space-y-0">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button onClick={() => handleDateRangeSelect('today')} variant="outline" size="sm" className="flex-grow sm:flex-grow-0">Today</Button>
          <Button onClick={() => handleDateRangeSelect('week')} variant="outline" size="sm" className="flex-grow sm:flex-grow-0">This week</Button>
          <Button onClick={() => handleDateRangeSelect('month')} variant="outline" size="sm" className="flex-grow sm:flex-grow-0">This month</Button>
          <Button onClick={() => handleDateRangeSelect('year')} variant="outline" size="sm" className="flex-grow sm:flex-grow-0">This year</Button>
        </div>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          className="w-full sm:w-auto mt-2 sm:mt-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 row-span-2">
          <CardHeader className="p-0">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              Total Calls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            <div className="flex justify-center">
              <CircularProgress
                value={stats.successfulCalls}
                total={stats.totalCalls}
                color="#4287f5"
                label="Calls"
              />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4287f5]" />
                  <span>{stats.successfulCalls} successful </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>{stats.unsuccessfulCalls} failed</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button className="btn-secondary" onClick={() => {/* TODO: Implement call history check */}}>
                Check Call History
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center">
          <CardHeader className="p-0 text-center w-full">
            <CardTitle className="text-sm font-medium flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-4 flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-500">
              {(() => {
                const hours = Math.floor(stats.totalDuration / 3600);
                const minutes = Math.floor((stats.totalDuration % 3600) / 60);
                if (hours > 0) {
                  return `${hours}H ${minutes}m`;
                } else {
                  return `${minutes}m`;
                }
              })()}
            </div>
            <div className="text-sm text-gray-500 mt-1">Total Call Time</div>
          </CardContent>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center">
          <CardHeader className="p-0 text-center w-full">
            <CardTitle className="text-sm font-medium flex items-center justify-center gap-2">
              <Timer className="w-4 h-4" />
              Average Call Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-4 flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-500">
              {Math.round(stats.averageDuration)}s
            </div>
            <div className="text-sm text-gray-500 mt-1">Per Call</div>
          </CardContent>
        </Card>
      </div>

      <CallGraph conversations={filteredConversations} dateRange={dateRange} />

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Call Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CallHeatmap
              data={heatmapData}
              days={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
              hours={Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

