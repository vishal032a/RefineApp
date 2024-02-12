import { IResourceComponentsProps, useUpdate } from "@refinedev/core";
import { useNavigate, useParams } from "react-router-dom";
import { useOne} from "@refinedev/core";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
export const PostEdit: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useOne({
    resource: "Posts",
    id: id,
  });

  const { mutate } = useUpdate();
  const [values, setValues] = useState({
    Title: "",
    Category: "",
    Hit: 0,
    Status: "",
  });

  const handleUpdate = () => {
    const idUpdate = id ?? 1234;
    mutate(
      {
        id: idUpdate,
        resource: "Posts",
        values: {
          ...values,
        },
      },
      {
        onError: (error, variables, context) => {
          alert("something is wrong please try after sometime")
        },
        onSuccess: (data, variables, context) => {
          navigate('/Posts')
        },
      }
    );
  };

  useEffect(() => {
    if (data?.data) {
      const post = data.data;
      setValues({
        Title: post.Title,
        Category: post.Category,
        Hit: post.Hit,
        Status: post.Status,
      });
    }
  }, [data?.data]);

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError)
    return <>Something is wrong please try after some time </>;
  else {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "10vw",
          marginRight: "10vw",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          style={{ marginBottom: "2vh" }}
        >
          Edit Post
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "4vh",
          }}
        >
          <TextField
            value={values.Title}
            placeholder="Title"
            onChange={(e) => setValues({ ...values, Title: e.target.value })}
          />
          <TextField
            value={values.Category}
            placeholder="Category"
            onChange={(e) => setValues({ ...values, Category: e.target.value })}
          />
          <TextField
            value={values.Hit}
            placeholder="Hit"
            onChange={(e) =>
              setValues({ ...values, Hit: Number(e.target.value) })
            }
          />
          <TextField
            value={values.Status}
            placeholder="Status"
            onChange={(e) => setValues({ ...values, Status: e.target.value })}
          />
        </Box>
        <Button
          variant="contained"
          style={{ width: "2vw" }}
          onClick={() => handleUpdate()}
        >
          Save
        </Button>
      </Box>
    );
  }
};
