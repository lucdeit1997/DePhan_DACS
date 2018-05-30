
const mongoose = require('mongoose');
const ObjectID = require('mongoose').ObjectID
const Address = require('./Address');
const User = require('./User');

const SchemaPost = mongoose.Schema;

const PostSchema = new SchemaPost({
    title:         { type: String, required: true, trim: true },
    contentSmall:  { type: String, required: true },
    contentLarge:  { type: String},
    image:         { type: String },
    price:         { type: Number, required: true},
    acreage:       { type: String},//Dien tích
    statusCurrent: { type: Boolean, default: 1 }, //1.active 0.block
    createAt:      { type: Date, default: Date.now() },
    updateAt:      { type: Date, default: Date.now() },
    CategoryID:    { type: String},
    view: { type: Number, default: 1 },
    author: {
        type: SchemaPost.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: SchemaPost.Types.ObjectId,
        ref: 'Address'
    }
});
const PostMongo = mongoose.model('Post', PostSchema);

class Post extends PostMongo {
    static async addPost( CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa, user_id){
        //add address Model
        const addressTemp = new Address({Tinh: Tinh, Huyen: Huyen, Thon_Xa: Thon_Xa});
        const addResSave = await addressTemp.save();

        //add Post Model
        const post = new Post({ CategoryID, title, contentSmall, contentLarge, image, price, acreage, author: user_id, address: addResSave._id })
        const postNew = await post.save(); // _id
        if (!postNew) throw new error('add_post_fail');
        
        // update array post of User
        const update_user_post = await User.findByIdAndUpdate(user_id, {
            $push: { Post: postNew._id}
        });
        return postNew;
    }

    static async removePost(idPost, user_id )
    {
        let postResult = await Post.findByIdAndUpdate(idPost, {
            statusCurrent: 0,
            updateAt: Date.now()
        })
        if(!postResult) throw new error('Cannot_find_by_idPost');
        const update_user = await User.findByIdAndUpdate(user_id, {
            $pull : { Post: postResult._id}
        })
        return postResult;
    }

    static async updatePost(idPost, CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa)
    {
        let postResult = await Post.findByIdAndUpdate(idPost, {
            CategoryID: CategoryID,
            title: title,
            contentSmall: contentSmall,
            contentLarge: contentLarge,
            image: image,
            price: price,
            acreage: acreage,
        }, { new: true }) 
        if(!postResult) throw new error('can_not_update_post');
        const update_address = await findByIdAndUpdate(postResult.address, {
            Tinh: Tinh,
            Huyen: Huyen,
            Thon_Xa: Thon_Xa
        })
        if (!update_address) throw new error('add_address_fail');
        return addResSave;
    }
    
    static async getListPost() {
        const list = await Post.find({}).populate('author').populate('address').exec();
        console.log('+++++++++++++++')
        console.log(list)
    }
    
    static async getInfoPost(idPost){
        const updateNew = await Post.findByIdAndUpdate(idPost, {
            $inc: {view: 1}
        }, {new: true});
        const infoPost = await Post.findById(idPost);
        return infoPost;
    }
    
    static async getListPostPopular(){
        const list = await Post.find({}).sort('-view');
        return list;
    }
}
module.exports = Post;
