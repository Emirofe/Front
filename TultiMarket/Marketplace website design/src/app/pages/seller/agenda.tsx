import { useState } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle } from "lucide-react";

export function SellerAgendaPage() {
  const [appointments] = useState([
    { id: "1", service: "Decorador de Bodas", client: "Maria G.", date: "2026-03-20", time: "10:00 AM", status: "Confirmado" },
    { id: "2", service: "Show Magia", client: "Ana L.", date: "2026-03-21", time: "04:00 PM", status: "Pendiente" }
  ]);
  
  const [availableDays, setAvailableDays] = useState({
    Lunes: true,
    Martes: true,
    Miercoles: true,
    Jueves: true,
    Viernes: true,
    Sabado: false,
    Domingo: false
  });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Mi Agenda</h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: 14 }}>
            Gestiona tus citas de servicios y horarios de atencion
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Availability Settings */}
        <div className="lg:col-span-1 border border-border bg-white rounded-xl p-6 h-fit">
          <h2 className="mb-4 flex items-center gap-2" style={{ fontSize: 18, fontWeight: 600 }}>
            <CalendarIcon size={20} className="text-primary" /> Dias Disponibles
          </h2>
          <div className="space-y-3">
            {Object.entries(availableDays).map(([day, isAvailable]) => (
              <div key={day} className="flex items-center justify-between">
                <span style={{ fontSize: 14 }}>{day}</span>
                <button
                  onClick={() => setAvailableDays(prev => ({ ...prev, [day]: !isAvailable }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAvailable ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAvailable ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="mb-3" style={{ fontSize: 14, fontWeight: 500 }}>Horario Base</h3>
            <div className="flex gap-2">
              <input type="time" defaultValue="09:00" className="flex-1 px-3 py-2 border border-border rounded-lg" style={{ fontSize: 13 }} />
              <span className="self-center">a</span>
              <input type="time" defaultValue="18:00" className="flex-1 px-3 py-2 border border-border rounded-lg" style={{ fontSize: 13 }} />
            </div>
            <button className="w-full mt-4 bg-primary text-white py-2 rounded-lg" style={{ fontSize: 14 }}>
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-border rounded-xl p-6">
             <h2 className="mb-4" style={{ fontSize: 18, fontWeight: 600 }}>Proximas Citas</h2>
             {appointments.length === 0 ? (
               <p className="text-muted-foreground text-center py-6">No tienes citas programadas.</p>
             ) : (
               <div className="space-y-4">
                 {appointments.map(app => (
                   <div key={app.id} className="border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                     <div>
                       <h3 style={{ fontSize: 16, fontWeight: 500 }}>{app.service}</h3>
                       <p className="text-muted-foreground" style={{ fontSize: 13 }}>Cliente: {app.client}</p>
                       <div className="flex items-center gap-4 mt-2">
                         <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded" style={{ fontSize: 12 }}>
                           <CalendarIcon size={14} /> {app.date}
                         </span>
                         <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded" style={{ fontSize: 12 }}>
                           <Clock size={14} /> {app.time}
                         </span>
                       </div>
                     </div>
                     <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                       <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100">
                         <CheckCircle2 size={16} /> <span style={{ fontSize: 13 }}>Confirmar</span>
                       </button>
                       <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100">
                         <XCircle size={16} /> <span style={{ fontSize: 13 }}>Cancelar</span>
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </>
  );
}
