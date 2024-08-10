const films = require('../models/filmsModel');
const series = require('../models/seriesModel');

const fetchContents = async(req,res)=> {
    const target = req.body.target;
    try {
        let data = {}
        if(target == "films"){
            data = await films.find();

        } else if(target == "series"){
            data = await series.find();
        }
        if (!data) {
            return res.status(404).send({ success: false, msg: target + " Not Found" });
        }
        res.status(200).send({ success: true, msg: target + ' Data Fetched', data: data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
const deleteContent = async(req,res)=> {
    const collection = req.body.collection;
    const id = req.body.id;
    console.log(collection, id)
    const query = { _id: id };
    try {
        let data = {}
        if(collection == "films"){
            data = await films.deleteOne(query);

        } else if(collection == "series"){
            data = await series.deleteOne(query);
        }
        if (!data) {
            return res.status(404).send({ success: false, msg: target + " Not Found" });
        }
        res.status(200).send({ success: true, msg: collection + ' Deleted', data: data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

module.exports = {
    fetchContents,
    deleteContent
}