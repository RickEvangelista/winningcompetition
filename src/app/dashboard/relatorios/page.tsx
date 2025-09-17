"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getReportsData } from "./actions/getReportsData";

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getReportsData(1);
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold text-custom-blue mb-4">
        Relatórios do Evento
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h2 className="text-lg font-semibold">Ingressos Vendidos</h2>
          <p className="text-3xl font-bold text-custom-green">
            {data.reduce((acc, item) => acc + item.vendidos, 0)}
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h2 className="text-lg font-semibold">Ingressos Validados</h2>
          <p className="text-3xl font-bold text-custom-orange">
            {data.reduce((acc, item) => acc + item.validados, 0)}
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h2 className="text-lg font-semibold">Setores Esgotados</h2>
          <p className="text-3xl font-bold text-custom-pink">
            {data.filter((item) => item.status === "Esgotado").length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Desempenho do evento</h2>
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
      <div className="bg-white shadow-md p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Comparativo por Setor</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend
              content={() => {
                return (
                  <div className="flex gap-6 mt-2 justify-center">
                    <div className="flex justify-center items-center gap-2">
                      <span
                        className="w-4 h-4"
                        style={{ backgroundColor: "var(--color-custom-blue)" }}
                      ></span>
                      <span>Disponível</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4"
                        style={{ backgroundColor: "var(--color-custom-pink)" }}
                      ></span>
                      <span>Crítico / Esgotado</span>
                    </div>
                  </div>
                );
              }}
              verticalAlign="bottom"
            />
            <Bar
              dataKey="ocupacao"
              fill="var(--color-custom-blue)"
              name="Ocupação"
              barSize={100}
            >
              {data.map((entry, index) => (
                <Cell
                  cursor="pointer"
                  fill={
                    entry.status === "Crítico" || entry.status === "Esgotado"
                      ? "var(--color-custom-pink"
                      : "var(--color-custom-blue"
                  }
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-[var(--color-custom-blue)]"></span>
            <span>Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-[var(--color-custom-pink)]"></span>
            <span>Crítico / Esgotado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
