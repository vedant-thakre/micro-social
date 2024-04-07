import QueryUser from "../models/queryUserModel.js";
import QueryComment from "../models/queryCommentModel.js";
import QueryPost from "../models/queryPostModel.js";
import axios from 'axios';

export const handleEvent = async (req, res) => {
  try {
    const { data, type, id } = req.body;

    console.log(req.body);

    if (type == "UserCreated") {
        console.log("Creating QueryUser");
      const NewQueryUser = await QueryUser.create({
        name: data.name,
        userId: data.id
      });
      res.status(201).json({
        message: "QueryUser created successfully",
        data: NewQueryUser,
      });
    } else if (type == "PostCreated") {
        console.log("Creating QueryPost");
      const NewQueryPost = await QueryPost.create({
          title: data.title,
          description: data.description,
          postId: data.id,
          userId: data.userId,
          name: data.name
      });
      res
        .status(201)
        .json({
          message: "QueryPost created successfully",
          data: NewQueryPost,
        });
    } else if (type == "CommentCreated") {
        console.log("Creating QueryComment");
        const NewQueryComment = await QueryComment.create({
            content: data.content,
            name: data.name,
            comId: data.id,
            postId: data.postId,
            status: data.status,
        });
        res.status(201)
            .json({
                message: "QueryComment created successfully",
                data: NewQueryComment,
            });
    } else if (type == "CommentUpdated") {
      console.log("Recieved Event", type);
      const UpdateComment = await QueryComment.findOneAndUpdate(
        { comId: data.id},
        { status: data.status},
        { new: true }
      );

      console.log(UpdateComment);

      res.status(201).json({
        message: "QueryComment status updated successfully",
        data: UpdateComment,
      });
    }
    console.log("Updating event status using id", id);
    await axios.put(`http://localhost:3050/api/v1/events/${id}`);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getcomments = async(req, res) => {
    const data = await QueryComment.find();
     res.status(201)
    .json({
        data,
    });
    
}

export const getusers = async (req, res) => {
  try {
     const usersWithPosts = await QueryUser.aggregate([
       {
         $lookup: {
           from: "queryposts", 
           let: { userId: "$userId" },
           pipeline: [
             {
               $match: {
                 $expr: {
                   $eq: ["$userId", "$$userId"],
                 },
               },
             },
           ],
           as: "posts",
         },
       },
     ]);
     res.status(200).json({ data: usersWithPosts });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getposts = async(req, res) => {
    const data = await QueryPost.find();
    res.status(201).json({
      data,
    });
}

export const getPostsAndComments = async (req, res) => {
  try {
    const postsWithComments = await QueryPost.aggregate([
      {
        $lookup: {
          from: "querycomments", // Name of the comments collection
          let: { postId: "$postId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$postId", "$$postId"],
                },
              },
            },
          ],
          as: "comments",
        },
      },
    ]);
    res.status(200).json({ data: postsWithComments });
  } catch (error) {
    console.error("Error fetching posts and comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

