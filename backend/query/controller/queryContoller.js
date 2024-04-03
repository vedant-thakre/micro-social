import QueryUser from "../models/queryUserModel.js";
import QueryComment from "../models/queryCommentModel.js";
import QueryPost from "../models/queryPostModel.js";

export const handleEvent = async (req, res) => {
  try {
    const { data, type } = req.body;

    if (type == "UserCreated") {
        console.log("Creating QueryUser");
      const NewQueryUser = await QueryUser.create({
        name: data.name,
        userId: data.id
      });
      console.log(NewQueryUser);
      res.status(201).json({
        message: "QueryUser created successfully",
        data: NewQueryUser,
      });
    } else if (type == "PostCreated") {
        console.log("Creating QueryPost",req.body);
      const NewQueryPost = await QueryPost.create({
          title: data.title,
          description: data.description,
          postId: data.id,
          userId: data.userId,
          name: data.name
      });
      console.log(NewQueryPost);
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
            postId: data.postId,
        });
        console.log(NewQueryComment);
        res.status(201)
            .json({
                message: "QueryComment created successfully",
                data: NewQueryComment,
            });
    }
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
