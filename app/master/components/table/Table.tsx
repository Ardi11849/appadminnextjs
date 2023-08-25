"use client"

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FontAwesomeIcon } from '../../../../lib/fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"


import $ from 'jquery';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  openModal2: any
  handleInputChange: any
  refresh: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  openModal2,
  handleInputChange,
  refresh
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })


  const action = (id: string, dari: string) => {
    if (dari == 'update') {
      openModal2('update', id);
    } else {
      openModal2('delete', id);
    }
    const datas = $("#" + id).data('datas');
    handleInputChange(datas);
  };

  return (
    <div>
      a
    </div>
  )
}