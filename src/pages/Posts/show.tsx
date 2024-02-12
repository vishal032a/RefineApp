import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

export const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams();
  const { queryResult } = useShow({
    resource: "Posts",
    id: id,
  });

  const { data, isLoading, isError } = queryResult;
  const post = data?.data;
  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <>Something is wrong please try after sometime</>;
  } else {
    return (
      <Box>
        <Typography>Current Post</Typography>
        <Typography>Id</Typography>
        <Typography>{post?.id}</Typography>
        <Typography>Title</Typography>
        <Typography>{post?.Title}</Typography>
        <Typography>Category</Typography>
        <Typography>{post?.Category}</Typography>
        <Typography>Status</Typography>
        <Typography>{post?.Status}</Typography>
      </Box>
    );
  }
};
