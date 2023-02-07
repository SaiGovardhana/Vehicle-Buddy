const { Collection, ObjectId, MongoClient } = require("mongodb");
const { getVehicle } = require("./VehicleDAO");


async function addBooking(bookingDetails)
{   let client=new MongoClient(process.env.MONGO_URL);
    //Retrieve Vehicle Details
    try{
        let vehicleid = bookingDetails.vehicleid;
        
        let vehicle=await getVehicle(vehicleid);
        //Add vehicle details
        if(vehicle==null)
            return false;
            console.log("HERE1")
        await client.connect();
        let {selleremail,vehicleprice}=vehicle;
        console.log("HERE2")
        let collection = client.db("vehicle_buddy").collection("bookings");
        let bookingdate=new Date(bookingDetails.date);
        
        if(bookingdate.toString().indexOf("Invalid")==0)
            return false;

        let result = await collection.insertOne({vehiclelocation:vehicle.location,vehiclename:vehicle.fullmodel,vehicleid:vehicleid,selleremail:selleremail,vehicleprice:vehicleprice,customeremail:bookingDetails.customeremail,bookingdate:bookingdate});
        if(result.insertedId != undefined) 
        {   
            return true;
        }
        else 
            return false;
    }
        catch(E){
            console.log(E);
            return false;
        }
        finally{
            await client.close();
        }
}

async function getCustomersBooking(email)
{
    let client=new MongoClient(process.env.MONGO_URL);
    //Retrieve Vehicle Details
    try{
       await client.connect();
       let collection=client.db("vehicle_buddy").collection("bookings");
       let bookings=[];
       if(email==undefined)
        return [];
       let cursor=collection.find({customeremail:email},{projection:{_id:0}});
        
       while(await cursor.hasNext())
       {
        let curElement=await cursor.next();
        bookings.push(curElement);
       }
        return bookings;
    }
        catch(E){
            console.log(E);
            return [];
        }
        finally{
            await client.close();
        }
}

module.exports = {addBooking,getCustomersBooking}