"use Client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"

export type Kelurahan = {
    code_kelurahan: string,
    name_kelurahan: string,
    code_kecamatan: string,
    name_kecamatan: string,
    code_kabupaten: string,
    name_kabupaten: string,
    code_provinsi: string,
    name_provinsi: string,
    code_negara: string,
    name_negara: string
}

export const colKelurahan: ColumnDef<Kelurahan>[] = [
    {
        accessorKey: "code_kelurahan",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Kode Kelurahan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "name_kelurahan",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nama Kelurahan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    // {
    //     accessorKey: "Kecamatan.code_kecamatan",
    //     header: ({ column }) => {
    //       return (
    //         <button
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Kode Kecamatan
    //           <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
    //         </button>
    //       )
    //     },
    // },
    {
        accessorKey: "name_kecamatan",
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
    // {
    //     accessorKey: "Kecamatan.Kabupaten.code_kabupaten",
    //     header: ({ column }) => {
    //       return (
    //         <button
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Kode Kabupaten
    //           <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
    //         </button>
    //       )
    //     },
    // },
    {
        accessorKey: "name_kabupaten",
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
    // {
    //     accessorKey: "Kecamatan.Kabupaten.Provinsi.code_provinsi",
    //     header: ({ column }) => {
    //       return (
    //         <button
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Kode Provinsi
    //           <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
    //         </button>
    //       )
    //     },
    // },
    {
        accessorKey: "name_provinsi",
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
    // {
    //     accessorKey: "Kecamatan.Kabupaten.Provinsi.Negara.code_negara",
    //     header: ({ column }) => {
    //       return (
    //         <button
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Kode Negara
    //           <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
    //         </button>
    //       )
    //     },
    // },
    {
        accessorKey: "name_negara",
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