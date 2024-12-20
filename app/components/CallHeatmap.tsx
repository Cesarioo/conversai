"use client"

import React from 'react'

interface HeatmapProps {
  data: number[][]
  days: string[]
  hours: string[]
}

export function CallHeatmap({ data, days, hours }: HeatmapProps) {
  const maxValue = Math.max(...data.flat())

  return (
    <div className="overflow-x-auto w-full">
      <div className="w-full min-w-[720px]">
        <div className="grid grid-cols-[auto,repeat(24,1fr)]">
          {/* Hour labels */}
          <div className="h-6" /> {/* Empty space for top-left corner */}
          {hours.map((hour) => (
            <div key={hour} className="h-6 text-[10px] text-center text-gray-500">
              {hour}
            </div>
          ))}

          {/* Heatmap cells with day labels */}
          {data.map((row, dayIndex) => (
            <React.Fragment key={dayIndex}>
              <div className="aspect-square flex items-center justify-end pr-2">
                <span className="text-xs text-blue-500">{days[dayIndex].slice(0, 3)}</span>
              </div>
              {row.map((value, hourIndex) => {
                const intensity = value / maxValue
                return (
                  <div
                    key={`${dayIndex}-${hourIndex}`}
                    className="relative border border-white aspect-square group"
                  >
                    <div
                      className={`absolute inset-0 transition-transform duration-200 ${
                        value > 0 ? 'group-hover:scale-150 group-hover:z-10' : ''
                      }`}
                      style={{
                        backgroundColor: value
                          ? `hsl(0, 100%, ${100 - (intensity * 50)}%)`
                          : '#faf0e6',
                      }}
                    >
                      {value > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-medium group-hover:text-[10px]">
                          {value}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

