"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getAllEventsReports } from "./actions/getReportsData";


export default function DashboardPage() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getAllEventsReports(1);
      setEventos(result);

      if (result.length > 0) {
        setSelectedEventId(result[0].id); // Seleciona o primeiro automaticamente
      }
    }
    load();
  }, []);

  console.log(eventos)


  const eventSelected = eventos.find((e) => e.id === selectedEventId);

      console.log(eventSelected)


  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between flex-col lg:flex-row gap-4">
        
      <h1 className="text-5xl font-semibold">Dashboard dos Eventos</h1>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-semibold">Selecione o Evento:</span>
        <select
          className="border p-2 rounded-lg"
          value={selectedEventId ?? undefined}
          onChange={(e) => setSelectedEventId(Number(e.target.value))}
        >
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.titulo}
            </option>
          ))}
        </select>
      </div>
          </div>

      {eventos.map((evento) => {
        if (evento.id !== selectedEventId) return null;

        const data = evento.setores;

        const totalCap = data.reduce((a, b) => a + b.capacidade, 0);
        const totalVend = data.reduce((a, b) => a + b.vendidos, 0);
        const totalVal = data.reduce((a, b) => a + b.validados, 0);
        const ocupTotal = totalCap
          ? ((totalVend / totalCap) * 100).toFixed(1)
          : 0;

        const setoresCriticos = data.filter(
          (s) => s.status === "Crítico" || s.status === "Esgotado"
        ).length;

        return (
          <div
            key={evento.id}
            className="flex flex-col gap-8 bg-white p-6 shadow-md rounded-2xl"
          >
            <h2 className="text-3xl text-center font-bold">{evento.titulo}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-semibold">
              <div className="p-4 bg-gray-100 rounded-2xl shadow">
                <h3 className="text-lg">Capacidade Total</h3>
                <p className="text-3xl text-custom-green">{totalCap}</p>
              </div>

              <div className="p-4 bg-gray-100 rounded-2xl shadow">
                <h3 className="text-lg">Ocupação Total</h3>
                <p className="text-3xl text-blue-600">
                  {ocupTotal}%
                </p>
              </div>

              <div className="p-4 bg-gray-100 rounded-2xl shadow">
                <h3 className="text-lg">Setores Críticos</h3>
                <p className="text-3xl text-red-600">
                  {setoresCriticos}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl shadow">
              <h3 className="text-xl mb-4 font-semibold">
                Desempenho Geral do Evento
              </h3>

              <ResponsiveContainer width="100%" height={330}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Disponíveis", value: totalCap - totalVend },
                      { name: "Vendidos", value: totalVend },
                      { name: "Validados", value: totalVal },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    <Cell fill="var(--color-custom-blue)" />
                    <Cell fill="var(--color-custom-yellow)" />
                    <Cell fill="var(--color-custom-green)" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl shadow">
              <h3 className="text-xl mb-4 font-semibold">
                Desempenho dos Setores
              </h3>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="capacidade"
                    fill="var(--color-custom-blue)"
                    name="Capacidade"
                  />
                  <Bar
                    dataKey="vendidos"
                    fill="var(--color-custom-yellow)"
                    name="Vendidos"
                  />
                  <Bar
                    dataKey="validados"
                    fill="var(--color-custom-green)"
                    name="Validados"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl shadow">
              <h3 className="text-xl mb-4 font-semibold">
                Lotação dos Setores
              </h3>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />

                  <Legend
                    content={() => (
                      <div className="flex gap-6 mt-2 justify-center">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-sm"
                            style={{
                              backgroundColor: "var(--color-custom-blue)",
                            }}
                          />
                          <span>Disponível</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-sm"
                            style={{
                              backgroundColor: "var(--color-custom-pink)",
                            }}
                          />
                          <span>Crítico / Esgotado</span>
                        </div>
                      </div>
                    )}
                  />

                  <Bar dataKey="ocupacao" barSize={100}>
                    {data.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          entry.status === "Esgotado" ||
                          entry.status === "Crítico"
                            ? "var(--color-custom-pink)"
                            : "var(--color-custom-blue)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
