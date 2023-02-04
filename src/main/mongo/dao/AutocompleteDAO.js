const {MongoClient}=require('mongodb');
let client=new MongoClient(process.env.MONGO_URL);

async function getStates(state)
{   
    try{
        
            await client.connect()
            let collection=client.db('vehicle_buddy').collection('autocomplete_states');
            let result=collection.aggregate([{$project:{state:1}}]);
            let stateArray=[]
            while(await result.hasNext())
                stateArray.push((await result.next()).state);
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
        let result=await collection.findOne({state:{'$regex' : `^${state}$`, '$options' : 'i'}},{projection:{_id:0,cities:1}});
        
        
        await client.close();
        if(result!=null)
        return result.cities;

    }
    catch(E)
    {   console.log(E)
        await client.close();
    }
    return null
}

module.exports={getStates,getCities};