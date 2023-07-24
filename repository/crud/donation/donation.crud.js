const Donations = require("../../../models/donationModel");
const sendMail = require("../../../Utils/email")


// create a new donation by user()
async function createNewDonation(req){
   try { 
        const newDonation = await Donations.create(req.body);

        if(newDonation === null){
            return {
                status: 'failed',
                message: 'unable to create donation'
            }
        }
        
        await sendMail({
                email: newDonation.organisationEmail,
                subject: 'New Donation',
                message: `<p>${newDonation.donatedBy} has successfully made a donation to support your campaign</p>`
            });

        return {
            status: "success",
            message: "donation created successfully",
            data : newDonation
        };
        }catch(err){
            console.log(err)
            return{
                status: "error",
                message: "An error occured, please try again",
            };
        }
    }
        
// get donations for a campaign 
async function getCampaignDonations(req){
    try{
        const result = await Donations.find({campaignId: req.params.campaignId});
        return {
            status: "success",
            message: "successfully retrieved donations",
            results : result.length,
            data: result
            }
        }
        catch(err){
            return{
            status: "error",
            message: "an error has occurred, please try again"
        } 
}
}
// get all donations
async function getAllDonations(skip = 0, limit = 50) {
    const offset = skip * limit;
    try{
        const result = await Donations.find().skip(offset).limit(limit);
        return {
            status: "success",
            message: "successfully retrieved donations",
            results : result.length,
            data: result
    
    }
   
}
    catch(err){
        return{
            status: "error",
            message: "an error has occurred, please try again"
        }

}
}

// get a donation by donationId
async function getDonationDetails(req){
    try{
        const result = await Donations.findOne({donationId: req.params.donationId})
        if(result === null){
            return {status : "failed" , message: "donation not found"}
        }
        return {
            status : "success",
            message: "donation found",
            data : result
        }
    }catch(error){
        return {status : "error" , message : "an error occured, please try again"}
    }
}



// accept donation
async function acceptDonation(req){
    try{
        const result = await Donations.updateOne({donationId : req.params.donationId}, 
            {$set : {donationStatus : "Completed"} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        return {
            status : "success",
            message : "Donation accepted successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}

// reject donation
async function rejectDonation(req){
    try{
        const result = await Donations.updateOne({donationId : req.params.donationId}, 
            {$set : {donationStatus : "Rejected"} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        return {
            status : "success",
            message : "Donation accepted successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}

//deliver donation
async function deliverDonation(req){
    try{
        const result = await Donations.updateOne({donationId : req.params.donationId}, 
            {$set : {delivered : true} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        return {
            status : "success",
            message : "Donation received successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}


// receive donation
async function receiveDonation(req){
    try{
        const result = await Donations.updateOne({donationId : req.params.donationId}, 
            {$set : {received : true} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        return {
            status : "success",
            message : "Donation received successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}



//update donation
async function updateDonation(req){
    try{
        const donation = await Donations.findOneAndUpdate({donationId: req.params.donationId}, req.body, {
            new: true,
            runValidators: true
        });
        if(donation === null){
            return {status : "failed" , message : "Failed to update donation"}
        }
        return {
            status : "success",
            message : "donation updated successfully",
            update : donation
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}


module.exports = {
    getAllDonations,
    getDonationDetails,
    acceptDonation,
    updateDonation,
    createNewDonation,
    getCampaignDonations,
    receiveDonation,
    deliverDonation,
    rejectDonation
}