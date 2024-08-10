const User = require('../models/userModel');

const createUser = async(req,res)=>{
    try {
        const user = new User({
            email:req.body.email,
            name:req.body.name,
        })
        const user_data = await user.save();
        res.status(200).send({success:true,msg:'User Data', data:user_data});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
const updateUser = async (req, res) => {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const userWatchList = req.body.watchlist;
    const userHistory = req.body.history;
    const userSubscribed = req.body.subscribed;
    const userSubscriptionEndDate = req.body.subscription_end_date;
    const userRecommendation = req.body.recommendation;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send({ success: false, msg: "User Not Found" });
        }


        if (userName) {
            user.name = userName;
        }
        if (userWatchList) {
            user.watchlist.push(userWatchList);
        }
        if (userHistory) {
            user.history.push(userHistory);
        }
        if (userSubscribed) {
            user.subscribed = userSubscribed;
        }
        if (userSubscriptionEndDate) {
            user.subscription_end_date = userSubscriptionEndDate;
        }
        if (userRecommendation) {
            user.recommendation.push(userRecommendation);
        }

        const user_data = await user.save();
        res.status(200).send({ success: true, msg: 'User Data Updated', data: user_data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const getUser = async(req,res)=>{
    const userEmail = req.body.email;

    try {
        const user_data = await User.findOne({ email: userEmail });
        if (!user_data) {
            return res.status(404).send({ success: false, msg: "User Not Found" });
        }
        res.status(200).send({ success: true, msg: 'User Data Fetched', data: user_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const deleteWatchlistItem = async(req,res)=>{
    const userEmail = req.body.email;
    const watchListItem = req.body.watchlist;

    try {
        const user_data = await User.findOneAndUpdate(
            { email: userEmail },
            { $pull: { watchlist: watchListItem } },
            { new: true }
          );
        if (!user_data) {
            return res.status(404).send({ success: false, msg: "User Not Found" });
        }
        res.status(200).send({ success: true, msg: 'Item removed from watchlist', data: user_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}


const fetchWatchlistItems = async(req,res)=> {
    const userEmail = req.body.email;

    try {
        const user_data = await User.findOne({ email: userEmail });
        if (!user_data) {
            return res.status(404).send({ success: false, msg: "User Not Found" });
        }
        res.status(200).send({ success: true, msg: 'User Data Fetched', data: user_data.watchlist });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}


module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteWatchlistItem,
    fetchWatchlistItems
}