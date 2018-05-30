// import { Schema } from "mongoose";

// // Content, createAt, status, rating
// Content : { type: String, require: true}
// CreateAt: {type: Date},
// Author: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
// },
// Comment: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Comment'
// }],
// rating: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Rating'
// }],
// liker: [{
//     type: Schema.Types.ObjectId,
//     ref: 'User'
// }]

// // 1 user dang 1 status
// /* Status Model
//     content, createAt
// */
// cosnt statusAdd = new Status({content, createAt, author: user_id});
// const add_status = statusAdd.save();
// const update_user = await User.findByIdAndUpdate(user_id, {
//     $push: { Status: add_status._id}
// })

// // xoa 1 bai post cua user
// const remove_status = await Status.findByIdAndRemove(id_status)
// const update_user = await User.findByIdAndUpdate(user_id, {
//     $pull: {
//         Status: remove_status._id
//     }
// })

// // get list status
// Status.find().populate('author')

// // get list comment of status
// Status.find().populate('author').populate('Comment').exec();


// //add rating cho comment => rating_id
// const rating = new rating({content, rating});//taoj rating temp
// const save_rating = await rating.save();// luu vao bang rating
// const updatte_comment = await status.findByIdAndUpdate(id_status, {//tim status nay va day rating vao
//     $push: {// day vao ma ko kiem tra
//         rating: save_rating._id // rating la 1 field cua status
//     }
// })

// //them 1 like cho status || id_status. 
// const update_like = await Status.findByIdAndUpdate(id_status, {
//     $addToSet: {// chi day vao 1 lan
//         liker: id_user
//     }
// })

// // get list liker of status
// const list = Status.find().populate('liker')//lay tac ca cac user like status

// //xoa comment cua status
// const remove_comment = await Comment.findByIdAndRemove(comment_id)
// const remove_comment_in_status = await Status.findByIdAndUpdate(status_id, {
//     $pull: {
//         Comment: remove_comment._id
//     }
// })