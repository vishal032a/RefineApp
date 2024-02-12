import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
  } from "@tanstack/react-table";
  import type { ColumnDef } from "@tanstack/react-table";
  import { useState } from "react";
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import EditIcon from '@mui/icons-material/Edit';
  import { Typography } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    resource_name?:String;
    // list_name?: String;
    // button_name?: String;
  }
  
  export const Table = <T extends object>({
    data,
    columns,
    resource_name
  }: ReactTableProps<T>) => {
    const [filtering, setFiltering] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const navigate = useNavigate();
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting: sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onGlobalFilterChange: setFiltering,
    });
  
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            placeholder="Search "
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            style={{ width: "12vw", height: "30px", marginBottom: "20px" }}
          />
        </div>
  
        <table>
          <thead style={{paddingRight:'10vw'}}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{ padding: "15px", marginBottom: "15px"}}
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
                <Typography fontWeight={600} >Action</Typography>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} style={{ padding: "15px" }}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "15px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <>
                <DeleteOutlineIcon onClick = {(e)=>{console.log(row._valuesCache.id)}} />
                <VisibilityIcon onClick = {(e)=>{navigate(`/${resource_name}/show/${row._valuesCache.id}`)}}/>
                <EditIcon onClick = {(e)=>{navigate(`/${resource_name}/edit/${row._valuesCache.id}`)}}/>
                </>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          <button
            style={{ padding: "5px" }}
            onClick={() => table.setPageIndex(0)}
          >
            First Page
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            style={{ padding: "5px" }}
            onClick={() => table.previousPage()}
          >
            previous Page
          </button>
          <button
            disabled={!table.getCanNextPage()}
            style={{ padding: "5px" }}
            onClick={() => table.nextPage()}
          >
            Next Page
          </button>
          <button
            style={{ padding: "5px" }}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last Page
          </button>
        </div>
      </div>
    );
  };
  