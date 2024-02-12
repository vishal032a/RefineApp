import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useList, BaseRecord } from "@refinedev/core";
// import {
//     useDataGrid,
//     EditButton,
//     ShowButton,
//     DeleteButton,
//     List,
// } from "@refinedev/mui";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Table } from "components/Table/Table";
import { Button, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export const PostsList: React.FC<IResourceComponentsProps> = () => {
  // const { dataGridProps } = useDataGrid();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useList({
    pagination:{
      mode:"off"
    }
  });
  const columns = useMemo<ColumnDef<BaseRecord>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Title",
        accessorKey: "Title",
      },
      {
        header: "Category",
        accessorKey: "Category",
      },
      {
        header: "Hit",
        accessorKey: "Hit",
      },
      {
        header: "Status",
        accessorKey: "Status",
      },
      
    ],
    []
  );

  const handleCreatePost = () => {
    navigate("/Posts/create");
  };

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <>Something went wrong please try after some time</>;
  } else {
    const posts = data.data;
    const listname = "Posts";
    const ButtonName = "Create Post";
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {listname}
          </Typography>
          <Button variant="contained" onClick={handleCreatePost}>
            {" "}
            <AddBoxIcon style={{ marginRight: "2px" }} />
            {ButtonName}
          </Button>
        </div>
        <Table data={posts} columns={columns} resource_name="posts" />
      </div>
    );
  }
  // const columns = React.useMemo<GridColDef[]>(
  //     () => [
  //         {
  //             field: "id",
  //             headerName: "Id",
  //             type: "number",
  //             minWidth: 50,
  //         },
  //         {
  //             field: "Title",
  //             flex: 1,
  //             headerName: "Title",
  //             minWidth: 200,
  //         },
  //         {
  //             field: "Category",
  //             flex: 1,
  //             headerName: "Category",
  //             minWidth: 200,
  //         },
  //         {
  //             field: "Hit",
  //             flex: 1,
  //             headerName: "Hit",
  //             minWidth: 200,
  //         },
  //         {
  //             field: "Status",
  //             flex: 1,
  //             headerName: "Status",
  //             minWidth: 200,
  //         },
  //         {
  //             field: "actions",
  //             headerName: "Actions",
  //             sortable: false,
  //             renderCell: function render({ row }) {
  //                 return (
  //                     <>
  //                         <EditButton hideText recordItemId={row.id} />
  //                         <ShowButton hideText recordItemId={row.id} />
  //                         <DeleteButton hideText recordItemId={row.id} />
  //                     </>
  //                 );
  //             },
  //             align: "center",
  //             headerAlign: "center",
  //             minWidth: 80,
  //         },
  //     ],
  //     [],
  // );

  // return (
  //     <List>
  //         <DataGrid {...dataGridProps} columns={columns} autoHeight />
  //     </List>
  // );
};
