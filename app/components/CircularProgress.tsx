"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface CircularProgressProps {
  value: number
  total?: number
  color?: string
  size?: number
  label?: string
  type?: 'gauge' | 'donut'
}

export function CircularProgress({ 
  value, 
  total = 100, 
  color = "#4287f5",
  size = 120,
  label,
  type = 'donut'
}: CircularProgressProps) {
  // For a full circle, we'll use a single data point with value 100
  const isFull = value === total
  
  const data = type === 'gauge'
  ? [
      { value: (value / total) * 100 },
      { value: 100 - (value / total) * 100 },
    ]
  : isFull
    ? [{ value: 100 }] // Single segment for full circle
    : [
        { value: (value / total) * 100 },
        { value: 100 - (value / total) * 100 },
      ]

  const startAngle = type === 'gauge' ? 180 : 0
  const endAngle = type === 'gauge' ? 0 : 360

  return (
    <div className="relative" style={{ width: size, height: type === 'gauge' ? size/2 : size }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy={type === 'gauge' ? "100%" : "50%"}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={size/3}
            outerRadius={size/2}
            paddingAngle={0}
            dataKey="value"
            cornerRadius={0}
          >
            <Cell fill={color} />
            {(!isFull && type === 'donut') && <Cell fill="#f3f4f6" />}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {label && (
              <>
                {label.includes('H') || label.includes('M') ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    {(() => {
                      const [hours, minutes] = label.split(' ');
                      const hoursNum = parseInt(hours);
                      return (
                        <>
                          {hoursNum > 0 && <div className="text-2xl font-bold">{hours}</div>}
                          <div className={`text-xl ${hoursNum > 0 ? 'font-normal' : 'font-bold'}`}>{minutes}</div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

