import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLikePost, useLikeComment, useUnlikePost } from "./Like";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const [likeStatus, setLikeStatus] = useState(false);
  const handleLike = async (id) => {
    if (likeStatus) {
      await unlikePost(id);
      setLikeStatus(false);
    } else {
      await likePost(id);
      setLikeStatus(true);
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://thread-laravel.vercel.app/api/post");
      console.log(response);
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Lỗi rồi !");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
    // handleLike();
  }, []);

  if (loading)
    return <div className="text-center mt-5 h-screen">Chờ chút nhé ...</div>;
  if (error) return <div className="text-center mt-5 h-screen">{error}</div>;

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.post_id}
            className="border-b border-gray-400 last:border-none"
          >
            <div className="px-6 py-3">
              <NavLink to={`/profile/${post.user_id}`}>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={`http://localhost:8000/storage/${post.users.profile_image}`}
                    alt=""
                    className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
                  />
                  <div>{post.users.display_name}</div>
                </div>
              </NavLink>
              <NavLink to={`/post/${post.post_id}`}>
                <h2 className="font-bold">{post.title}</h2>
                <p>{post.content}</p>
                <div className="flex justify-end text-gray-400">
                  {post.clicks} Lượt xem
                </div>
              </NavLink>
              <div className="flex flex-row gap-10 text-xl">
                <div className="flex gap-1 items-center">
                  <button onClick={() => handleLike(post.post_id)}>
                    <FontAwesomeIcon
                      className={`${
                        likeStatus ? "text-red-600 hover:text-red-300" : ""
                      } hover:text-gray-500`}
                      icon={faHeart}
                    />
                  </button>
                  <p className="text-base">{post.likes_count}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <button>
                    <FontAwesomeIcon
                      className="hover:text-gray-500"
                      icon={faComment}
                    />
                  </button>
                  <p className="text-base">{post.comments_count}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <button>
                    <FontAwesomeIcon
                      className="hover:text-gray-500"
                      icon={faRetweet}
                    />
                  </button>
                  <p className="text-base">{post.retweets_count}</p>
                </div>
                <button>
                  <FontAwesomeIcon
                    className="hover:text-gray-500"
                    icon={faShareFromSquare}
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </>
  );
};

export default Post;
