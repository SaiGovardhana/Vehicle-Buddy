const {MongoClient}=require('mongodb');

async function addVehicle(vehicle,sellermail)
{
    let client=new MongoClient(process.env.MONGO_URL);
    try
    {   await client.connect();
        //await client.connect();
        let collection=client.db('vehicle_buddy').collection('vehicles');
        let {location,model,vehicleprice,profilepic}=vehicle;
        let [modelName,brand]=model.split(',');
        let [city,state]=location.split(',');
        city=city.trim();
        state=state.trim();
        modelName=modelName.trim();
        brand=brand.trim();
        await collection.insertOne({"selleremail":sellermail,location:location,vehicleprice:vehicleprice,pic:profilepic,model:modelName,brand:brand,fullmodel:model,city:city,state:state,model:model});
    
        return true;
    }
    catch(E)
    {
        console.log(E);
        //client.close();
        return false;
    }
    finally
    {
        await client.close();
    }


}

async function getVehicles()
{
    let client=new MongoClient(process.env.MONGO_URL);
    try
    {   await client.connect();
        //await client.connect();
        let collection=client.db('vehicle_buddy').collection('vehicles');
       
        let cursor= collection.find({});
        let results=[];
        while(await cursor.hasNext())
            {
                results.push(await cursor.next());
            }
        return results;
    }
    catch(E)
    {
        console.log(E);
        //client.close();
        return [];
    }
    finally
    {
        await client.close();
    }

}

module.exports={addVehicle,getVehicles};