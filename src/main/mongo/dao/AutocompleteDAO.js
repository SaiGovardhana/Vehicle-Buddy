const {MongoClient}=require('mongodb');
let client=new MongoClient(process.env.MONGO_URL);

async function getStates(state)
{   
    try{
        
            await client.connect()
            let collection=client.db('vehicle_buddy').collection('autocomplete_states');
            let result=collection.aggregate([{$group:{_id:"$state"}},{$project:{_id:1}}]);
            let stateArray=[]
            while(await result.hasNext())
                stateArray.push((await result.next())._id);
            await result.close();
            await client.close();
            return stateArray;

        }
    catch(E)
    {
        await client.close();
    }
    return null
}

async function getCities(state)
{
    try{
        
        await client.connect()
        let collection=client.db('vehicle_buddy').collection('autocomplete_states');
        let cursor=collection.find({state:{'$regex' : `^${state}$`, '$options' : 'i'}},{projection:{_id:0,city:1}});
        let result=[]
        while(await cursor.hasNext())
            {   
                result.push((await cursor.next()).city)
            }
        
        await client.close();
        if(result!=null)
        return result;

    }
    catch(E)
    {   console.log(E)
        await client.close();
    }
    return null
}

async function getLocations(search)
{
    try{
        
        await client.connect()
        let collection=client.db('vehicle_buddy').collection('autocomplete_states');
        let result=collection.find({location:{'$regex' : `${search}`, '$options' : 'i'}},{projection:{_id:0,location:1}});
        let locations=[]
        while(await result.hasNext())
            locations.push((await result.next()).location);
        await client.close();
        if(result!=null)
        return locations;

    }
    catch(E)
    {   console.log(E)
        await client.close();
    }
    return null
}

module.exports={getStates,getCities,getLocations};