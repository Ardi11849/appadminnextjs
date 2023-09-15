"use Client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"

export type Kecamatan = {
    code_kecamatan: string,
    name_kecamatan: string,
    code_kabupaten: string,
    name_kabupaten: string,
    code_provinsi: string,
    name_provinsi: string,
    code_negara: string,
    name_negara: string
}

export const colKecamatan: ColumnDef<Kecamatan>[] = [
    {
        accessorKey: "code_kecamatan",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Kode Kecamatan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nama Kecamatan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "Kabupaten.name",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nama Kabupaten
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "Kabupaten.Provinsi.name",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nama Provinsi
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "Kabupaten.Provinsi.Negara.name",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nama Negara
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
]