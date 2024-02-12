import { Box, TextField,Button,Typography} from "@mui/material";
import { IResourceComponentsProps } from "@refinedev/core";
import { useState } from "react";
import { useCreate } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

interface FormValues {
  Title: String;
  Category: String;
  Hit: Number | null;
  Status: String;
}

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const { mutate } = useCreate();
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>({
    Title: "",
    Category: "",
    Hit: null,
    Status: "",
  });

  const handleCreatePost = (e: any) => {
    e.preventDefault();

    mutate(
      {
        resource: "Posts",
        values: { ...values },
      },
      {
        onError: (error, variables, context) => {
          //An error occured
        },
        onSuccess: (data, variables, context) => {
            navigate('/Posts');
        },
      }
    );
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',marginBottom:'5vh'}}>
        <Typography variant="h4" fontWeight={600} >Create Post</Typography>
      </div>
      <Box style={{ marginLeft:'10vw',marginRight:'10vw' }}>
        <form
          // onSubmit={handleCreatePost}
          style={{ display: "flex", flexDirection: "column", justifyContent:'center' }}
        >
          <TextField
            label="Title"
            variant="outlined"
            value={values.Title as string}
            onChange={(e) => setValues({ ...values, Title: e.target.value })}
            style={{marginBottom:'20px'}}
          />
          <TextField
            label="Category"
            variant="outlined"
            value={values.Category as string}
            onChange={(e) => setValues({ ...values, Category: e.target.value })}
            style={{marginBottom:'20px'}}
          />
          <TextField
            label="Hit"
            variant="outlined"
            value={values.Hit as Number}
            onChange={(e) => setValues({ ...values, Hit:Number(e.target.value)})}
            style={{marginBottom:'20px'}}
          />
          <TextField
            label="Status"
            variant="outlined"
            value={values.Status as string}
            onChange={(e) => setValues({ ...values, Status: e.target.value })}
            style={{marginBottom:'20px'}}
          />

          <Button variant="contained" onClick={(e)=>handleCreatePost(e)} style={{width:'10vw'}}>Create</Button>
        </form>
      </Box>
    </>
  );
};
