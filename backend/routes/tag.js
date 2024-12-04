const express = require("express");
const router = express.Router();
const { User, Tag, UserTag, PostTag } = require("../models");
const { autheticateUser } = require("../middleware/authUser");

// use sequelize to fetch for data in the db
const {sequelize} = require("../models/index"); // get sequelize from the index.js to gain access to the database
const { QueryTypes } = require("sequelize");


// fetch for user interested tag
router.get("/user", autheticateUser, async (req, res)=>{
    const userId = parseInt(req.session.userId, 10);
    try{
        // using query to select tags out of the database
        const tags = await sequelize.query(
            `SELECT tag.id as TagId, tag.tag
            FROM "user"
            JOIN user_tag ON "user".id = user_tag."UserId"
            JOIN tag ON tag.id = user_tag."TagId"
            WHERE "user".id = ?;`,
            {
                replacements: [userId],
                type: QueryTypes.SELECT
            }
        )
            // if there is tag, then return
        if (tags){
            return res.status(200).json(tags);
        }
        else{ // else no tag is there
            return res.status(404).json({message: "The user is not interested in any tags"})
        }

    } catch(error){
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured during fetching for tags",
            error: errorMessage
        })
    }
});

// post a user interested tag into the user_tag table
// if the tag that user is interested in is not in the Tag table, then insert a new tag
router.post("/user/:tagId", autheticateUser, async (req, res)=>{
    const interestedTagId = parseInt(req.params.tagId, 10);
    const userId = parseInt(req.session.userId, 10);

    try{
        // check if the interestedTag is inside the tag table
        const tagExist = await Tag.findOne({where: {id: interestedTagId}});
        if (!tagExist){
            return res.status(404).json({message: "The tag is not found"});
        }
        
        // check if the user added the tag as interested already in user_tag table
        // if yes inside the table, return 409 error for conflict
        if (await UserTag.findOne({where: {UserId: userId, TagId: tagExist.id}})){
            return res.status(409).json({message: "You have added the tag already."});
        }
        
        // when user didn't added the tag already and tag is inside the "tag" table
        const insertTag = await UserTag.create({
            UserId: userId,
            TagId: parseInt(tagExist.id, 10)
        });

        return res.status(201).json({
            message: "Your tag is being added!",
            tagId: insertTag.TagId, 
            tag: tagExist.tag,
        })
    } catch(error){
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured during adding tags",
            error: errorMessage
        });
    }
});

// delete a tag from a user's interested tags
router.delete("/user/:tagId", autheticateUser, async (req,res)=>{
    const tagId = parseInt(req.params.tagId,10);

    try{
        const deleteTag = await UserTag.destroy({where: 
            {
                UserId: parseInt(req.session.userId,10),
                TagId: tagId
            }
        });

        return res.status(200).json({message: "Removed the tag from the interest"});
    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({
            message: "An error occured during deleting tags",
            error: errorMessage
        })

    }
});

// delete a tag on a post
router.delete("/:postId/:tagId", autheticateUser, async(req,res)=>{
    const postId = parseInt(req.params.postId, 10);
    const tagId = parseInt(req.params.tagId, 10);
    const userId = parseInt(req.session.userId, 10); 
    try{
        // delete the tag from the post_tag table if:
            // current userId === post's creator
            // given TagId === post_tag's TagId
            // given PostId === post_tag's PostId
        const deletedTag = await sequelize.query(
            `
            DELETE FROM post_tag
            USING tag, post, "user"
            WHERE post_tag."TagId" = tag.id
            AND post_tag."PostId" = post.id
            AND post."UserId" = "user".id
            AND post_tag."TagId" = :tagId
            AND "user".id = :userId
            AND post_tag."PostId" = :postId;
            `,
            {
                replacements: {tagId: tagId, postId: postId, userId: userId},
                type: QueryTypes.DELETE
            }
        )

        // will return tag deleted regardless of wrong input like TagId and UserId and PostId
        return res.status(200).json({message: "Tag deleted successfully"});

    }catch(error){
        const errorMessage = error.message;
        return res.status(500).json({error: errorMessage});
    }
})


// fetch all tags on a post
router.get("/:postId", async(req, res)=>{
    const postId = parseInt(req.params.postId, 10);
    try{
        const tags = await sequelize.query(`
        SELECT post_tag."TagId", tag.tag
        FROM post_tag
        JOIN tag ON post_tag."TagId" = tag.id
        WHERE post_tag."PostId" = :postId;
        `,
        {
            replacements: {postId: postId},
            type: QueryTypes.SELECT
        }
        );

        if (tags.length === 0){
            return res.status(404).json({message: "No tags found"});
        }
        else{
            return res.status(200).json(tags);
        }

    } catch(error){
        return res.status(500).json({message: "An error occured when fetching for tags"})
    }
})


// get all tags in the database, so we can let users to know what tags we have
router.get("/", async(req, res)=>{
    try{
        const tags = await Tag.findAll();
        return res.status(200).json(tags);

    } catch(error){
        return res.status(500).json({message: "An error occured when fetching for tags"})
    }
});

module.exports = router;
