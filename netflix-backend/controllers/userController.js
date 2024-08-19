const User = require('../models/userModel');
const films = require('../models/filmsModel');
const series = require('../models/seriesModel');

const createUser = async(req,res)=>{
    try {
        const user = new User({
            email:req.body.email,
            name:req.body.name,
            subsciption_end_date:req.body.subsciption_end_date,
            subscribed:req.body.subscribed,
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

const getUsers = async(req,res)=>{
    try {
        const user_data = await User.find();
        if (!user_data) {
            return res.status(404).send({ success: false, msg: "Users Not Found" });
        }
        res.status(200).send({ success: true, msg: 'Users Data Fetched', data: user_data });

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

const deleteUser = async(req,res)=>{
    const userEmail = req.body.email;
    try {
        const data = await User.deleteOne({ email: userEmail });

        if (data.deletedCount === 0) {
            return res.status(404).send({ success: false, msg: "User Not Found" });
        }

        res.status(200).send({ success: true, msg: 'User Deleted', data: data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
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

const getRecommendation = async(req,res)=> {
    const userEmail = req.body.email;
    try {
        const data = await recommendVideosForUser(userEmail)
        const extractTitles = (data) => {
            return data.map(video => video.title);
        };
        
        const titles = extractTitles(data);
        const result = await User.updateOne(
            { email: userEmail }, // Filter to find the document (you might use another identifier)
            { $set: { recommendation: titles } }
        );

        if (!data) {
            return res.status(404).send({ success: false, msg: "User Not Found" });
        }
        res.status(200).send({ success: true, msg: 'User Data Fetched', data: titles });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

async function recommendVideosForUser(userEmail) {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];  // Swap elements
        }
        return array;
    }


    const natural = require('natural');
    const cosineSimilarity = require('cosine-similarity');
    const seriesData = await series.find();
    const filmsData = await films.find();

    const videos = shuffleArray(seriesData.concat(filmsData));
    const userData = await User.findOne({ email: userEmail });
    const userWatchHistory = userData.history;  // Assuming userData.history contains a list of titles
    // Fetch videos and user data from MongoDB

    if (!videos.length) {
        console.error('No videos found in the database.');
        return [];
    }

    if (!userWatchHistory.length) {
        console.error('User watch history is empty.');
        return [];
    }
    // One-hot encode genres
    const genres = Array.from(new Set(videos.map(video => video.genre)));

    function encodeGenre(genre) {
        return genres.map(g => (g === genre ? 1 : 0));
    }

    // Initialize TF-IDF
    const tfidf = new natural.TfIdf();
    videos.forEach(video => tfidf.addDocument(video.description));


    // Convert descriptions to TF-IDF vectors
    function encodeDescription(description) {
        const vector = [];
        tfidf.tfidfs(description, (i, measure) => {
            vector.push(measure);
        });
        return vector;
    }

    // Generate feature vectors for all videos
    function getVideoFeatures(video) {
        const genreVector = encodeGenre(video.genre);
        const descriptionVector = encodeDescription(video.description);
        return [...genreVector, ...descriptionVector];
    }

    const videoFeatures = videos.map(getVideoFeatures);


    // Calculate similarity between watched videos and all other videos
    function getRecommendations(watchHistory, N = 10) {
        const userVectors = watchHistory.map(title => videoFeatures.find((_, i) => videos[i].title === title));
        const userSimilarityScores = userVectors.reduce((acc, vec) => {
            return videoFeatures.map((vf, i) => acc[i] + cosineSimilarity(vec, vf));
        }, new Array(videoFeatures.length).fill(0));


        if (userVectors.length === 0) {
            console.log('No user vectors found. Check watch history and video data.');
            return [];
        }


        // Sort videos by similarity and exclude watched videos
        const recommendedIndices = userSimilarityScores
            .map((score, index) => ({ index, score }))
            .sort((a, b) => b.score - a.score)
            .map(item => item.index)
            .filter(index => !watchHistory.includes(videos[index].title))
            .slice(0, N);


        return recommendedIndices.map(index => videos[index]);
    }

    const recommendations = getRecommendations(userWatchHistory);
    return recommendations;
}



module.exports = {
    createUser,
    updateUser,
    getUser,
    getUsers,
    deleteWatchlistItem,
    fetchWatchlistItems,
    deleteUser,
    getRecommendation
}