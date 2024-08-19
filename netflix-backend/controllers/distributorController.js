const Distributor = require('../models/distributorModel');
const films = require('../models/filmsModel');
const series = require('../models/seriesModel');

const createDistributor = async(req,res)=>{
    try {
        const Distributor = new Distributor({
            email:req.body.email,
            name:req.body.name,
            company_name:req.body.company_name,
        })
        const Distributor_data = await Distributor.save();
        res.status(200).send({success:true,msg:'Distributor Data', data:Distributor_data});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
const updateDistributor = async (req, res) => {
    const DistributorEmail = req.body.email;
    const DistributorName = req.body.name;
    const DistributorCompanyName = req.body.company_name;
    const DistributorPaymentID = req.body.payment_id;
    const DistributorContentID = req.body.content_id;
    const DistributorPaymentList = req.body.payment_list;

    try {
        const Distributor = await Distributor.findOne({ email: DistributorEmail });
        if (!Distributor) {
            return res.status(404).send({ success: false, msg: "Distributor Not Found" });
        }


        if (DistributorName) {
            Distributor.name = DistributorName;
        }
        if (DistributorCompanyName) {
            Distributor.company_name.push(DistributorCompanyName);
        }
        if (DistributorPaymentID) {
            Distributor.payment_id.push(DistributorPaymentID);
        }
        if (DistributorContentID) {
            Distributor.content_id = DistributorContentID;
        }
        if (DistributorPaymentList) {
            Distributor.payment_list.push(DistributorPaymentList);
        }

        const Distributor_data = await Distributor.save();
        res.status(200).send({ success: true, msg: 'Distributor Data Updated', data: Distributor_data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const getDistributor = async(req,res)=>{
    const DistributorEmail = req.body.email;

    try {
        const Distributor_data = await Distributor.findOne({ email: DistributorEmail });
        if (!Distributor_data) {
            return res.status(404).send({ success: false, msg: "Distributor Not Found" });
        }
        res.status(200).send({ success: true, msg: 'Distributor Data Fetched', data: Distributor_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const getDistributors = async(req,res)=>{
    try {
        const Distributor_data = await Distributor.find();
        if (!Distributor_data) {
            return res.status(404).send({ success: false, msg: "Distributors Not Found" });
        }
        res.status(200).send({ success: true, msg: 'Distributors Data Fetched', data: Distributor_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}


const deleteDistributor = async(req,res)=>{
    const DistributorEmail = req.body.email;
    try {
        const data = await Distributor.deleteOne({ email: DistributorEmail });

        if (data.deletedCount === 0) {
            return res.status(404).send({ success: false, msg: "Distributor Not Found" });
        }

        res.status(200).send({ success: true, msg: 'Distributor Deleted', data: data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


module.exports = {
    createDistributor,
    updateDistributor,
    getDistributor,
    getDistributors,
    deleteDistributor
}