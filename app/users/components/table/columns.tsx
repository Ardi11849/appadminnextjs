"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users =
    {
        id: string,
        username: string,
        perusahaan: string,
        alamatperusahaan: string,
        active: number,
        createdAt: string,
        updatedAt: string
    }

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Username
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "perusahaan",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nama Perusahaan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "alamatperusahaan",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Alamat Perusahaan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "active",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
        cell: ({ row }) => {
            const aktif = parseFloat(row.getValue("active"))
            const formatted = aktif == 1 ? 'Aktif' : 'Tidak Aktif'

            return <div className="">{formatted}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Tanggal Pembuatan
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Tanggal Edit
              <ArrowUpDown className="ml-2 h-4 w-4 float-right" />
            </button>
          )
        },
    }
]
