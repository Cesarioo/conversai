import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LiveSupport() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Live Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Schedule an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video">
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1mXTZRDBVCJjKaQo7pLeAgBITfFE43GAb69t3J40uH633oaXk-BV8wTGv2h74SJpnK_GmJeygV?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Google Calendar Appointment Scheduling"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

