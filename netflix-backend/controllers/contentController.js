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

const getContent = async(req,res)=> {
    const target = req.body.target;
    const slug = req.body.slug;
    try {
        let data = {}
        if(target == "films"){
            data = await films.findOne({"slug": slug});

        } else if(target == "series"){
            data = await series.findOne({"slug": slug});
        }
        if (!data) {
            return res.status(404).send({ success: false, msg: target + " Not Found" });
        }
        res.status(200).send({ success: true, msg: target + ' Data Fetched', data: data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const updateContents = async(req,res)=> {
    const target = req.body.target;
    const id = req.body.id;
    const contenttitle = req.body.title;
    const description = req.body.description;
    const genre = req.body.genre;
    const maturity = req.body.maturity;
    const slug = req.body.slug;

    try {
        let content = {}
        if(target == "films"){
            content = await films.findOne({ _id: id });

        } else if(target == "series"){
            content = await series.findOne({ _id: id });
        }
        if (!content) {
            return res.status(404).send({ success: false, msg: "content Not Found" });
        }
        if (contenttitle) {
            content.title = contenttitle;
        }
        if (description) {
            content.description = description;
        }
        if (genre) {
            content.genre = genre;
        }
        if (maturity) {
            content.maturity = maturity;
        }
        if (slug) {
            content.slug = slug;
        }

        const content_data = await content.save();
        res.status(200).send({ success: true, msg: 'Content Updated', data: content_data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
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
    updateContents,
    deleteContent,
    getContent
}