import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export const useCommentPost = () => {
  const { csrfToken } = useAuth();

  const commentPost = async ({postID, content}) => {
    try {
      await csrfToken();
      const response = await axios.post(
        `http://localhost:8000/api/post/${postID}/comment`,
        {
          content
        },
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error commenting post:", error);
    }
  };

  return commentPost;
};

export const useCommentOnComment = ({postID, commentID}) => {
  const { csrfToken } = useAuth();

  const commentOnComment = async () => {
    try {
      await csrfToken();
      const response = await axios.post(
        `http://localhost:8000/api/post/${postID}/comment/${commentID}/comment`,
        {
            content,
        },
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      console.log(response.data);
      return response.data; // Optionally return response data
    } catch (error) {
      console.error("Error commenting comment:", error);
      throw error; // Rethrow the error if needed
    }
  };

  return commentOnComment;
};