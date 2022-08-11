const express=require('express')
const app=express()
const cors=require('cors')

const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient;
//const URL='mongodb://localhost:27017';
 const dotenv=require("dotenv").config();
 const URL=process.env.DB;
//const URL ="mongodb+srv://PRAKASH7708:<>@cluster0.2n5s99z.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json())
app.use(cors({
    origin:"*"
    // origin:"*" it allows all api requests req
}))

//Write API to create Mentor

app.post("/mentor",async function(req,res){

    try {//mongodb
     //open the connection
     const connection =await mongoClient.connect(URL)
     //console.log("db connected")
     //select the DB
     const db=connection.db("menstu");
     //select the collection and do the operation(insert,update)
     await db.collection("menstu1").insertOne(req.body)
     //close the connection
     await connection.close();
 
    res.json({
     message:"data inserted"
    })
 }
     catch(error){
         console.log(error);
     }})


//find all mentors
app.get("/mentor",async function(req,res){
    try{
       //open the connection
     const connection =await mongoClient.connect(URL)
     //console.log("db connected")
      //select the DB
      const db=connection.db("menstu");
      //select the collection and do the operation(insert,update)
      let mentors= await db.collection("menstu1").find({asnstu:true}).toArray()
      //close the connection
      await connection.close();
      res.json(mentors)
    }
    catch(error){
        console.log(error)
    }
})

//Write API to show all students for a particular mentor

app.get("/mentor/:id",async function(req,res){
    //console.log(req.params.id)
    try{
        const connection=await mongoClient.connect(URL)
       
        const db=connection.db("menstu")
        let students=await db.collection("menstu1").find({mentor:`${req.params.id}`}).toArray()//its converts string to mongodb _id
        await connection.close()
        
        res.json(students)
    }
    catch(error){
        console.log(error)
    }
})

//A student who has a mentor should not be shown in List

app.get("/mentoraddstu",async function(req,res){
    //console.log(req.params.id)
    try{
        const connection=await mongoClient.connect(URL)
       
        const db=connection.db("menstu")
        let addstu=await db.collection("menstu1").find({mentor:""}).toArray()//its converts string to mongodb _id
        await connection.close()
        //console.log(addstu)
        res.json(addstu)
    }
    catch(error){
        console.log(error)
    }
})

//Select one mentor and Add multiple Student 

app.put("/asnstu/:id",async function(req,res){
    // console.log(req.params.id)
    // console.log(req.body.id)
    try{
        const connection=await mongoClient.connect(URL)
        const db=connection.db("menstu")
        let addstu=await db.collection("menstu1").updateOne({name:`${req.body.id}`},{$set:{mentor:`${req.params.id}`}})
        await connection.close()
        //console.log(addstu)
        res.json(addstu)
    }
    catch(error){
        console.log(error)
    }
})

//Write API to create Student

 app.post("/student",async function(req,res){

        try {//mongodb
         //open the connection
     const connection =await mongoClient.connect(URL)
    
     //select the DB
     const db=connection.db("menstu");
     //select the collection and do the operation(insert,update)
     await db.collection("menstu1").insertOne(req.body)
     //close the connection
     await connection.close();
 
    res.json({
     message:"data inserted"
    })
     }
         catch(error){
             console.log(error);
         }})
         
 //get all students

app.get("/student",async function(req,res){
            try{
               //open the connection
             const connection =await mongoClient.connect(URL)
            
              //select the DB
              const db=connection.db("menstu");
              //select the collection and do the operation(insert,update)
              let mentors= await db.collection("menstu1").find({asnmen:true}).toArray()
              //close the connection
              await connection.close();
              res.json(mentors)
            }
            catch(error){
                console.log(error)
            }
        })

// app.get("/stuchangemen",async function(req,res){
//             //console.log(req.params.id)
//             try{
//                 const connection=await mongoClient.connect(URL)
               
//                 const db=connection.db("menstu")
//                 let addstu=await db.collection("menstu1").find({mentor:{$exists:true}}).toArray()//its converts string to mongodb _id
//                 await connection.close()
                
//                 res.json(addstu)
//             }
//             catch(error){
//                 console.log(error)
//             }
//         })

app.put("/asnmentor/:id",async function(req,res){
            // console.log(req.params.id)
            // console.log(req.body.id)
            try{
                const connection=await mongoClient.connect(URL)
                const db=connection.db("menstu")
                let addstu=await db.collection("menstu1").updateOne({name:`${req.params.id}`},{$set:{mentor:`${req.body.id}`}})
                await connection.close()
                //console.log(addstu)
                res.json(addstu)
            }
            catch(error){
                console.log(error)
            }
        })


//delete mentor from table

app.delete("/mentordel/:id",async function(req,res){
          //console.log(req.params.id)
            try{
                const connection=await mongoClient.connect(URL)
                const db=connection.db("menstu")
                let students=await db.collection("menstu1").deleteOne({_id:mongodb.ObjectId(req.params.id)})//its converts string to mongodb _id
                await connection.close()
                res.json({
                    message:"item deleted"
                })
        
            }catch(error){
                console.log(error)
            }
        })
// delete student from table

app.delete("/studentdel/:id",async function(req,res){
            //console.log(req.params.id)
              try{
                  const connection=await mongoClient.connect(URL)
                  const db=connection.db("menstu")
                  let students=await db.collection("menstu1").deleteOne({_id:mongodb.ObjectId(req.params.id)})//its converts string to mongodb _id
                  await connection.close()
                  res.json({
                      message:"item deleted"
                  })
          
              }catch(error){
                  console.log(error)
              }
          })

     app.listen(process.env.PORT || 3001)






//end


     // let call=()=>{
        //     const connection=await mongoClient.connect(URL)
        //         const db=connection.db("demo2")
        //         await db.collection("demo2").insertOne({"ganesh":"adb"})
        //         await connection.close()
        //         console.log("jhbjhb")
               
        
        // }
        // call()
        
        //geting id and data for delete or edit
        // app.get("/student/:id",async function(req,res){
        //     try{
        //         const connection=await mongoClient.connect(URL)
        //         const db=connection.db("firstdata")
        //         let students=await db.collection("firstdata").findOne({_id:mongodb.ObjectId(req.params.id)})//its converts string to mongodb _id
        //         await connection.close()
        //         res.json(students)
        
        //     }catch(error){
        //         console.log(error)
        //     }
        // })
        
        //edit
        // app.put("/student/:id",async function(req,res){
        //     try{
        //         const connection=await mongoClient.connect(URL)
        //         const db=connection.db("firstdata")
        //         let students=await db.collection("firstdata").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})//its converts string to mongodb _id
        //         await connection.close()
        //         res.json({
        //             message:"item updated"
        //         })
        
        //     }catch(error){
        //         console.log(error)
        //     }
        // })
        
        //delete
        // app.delete("/student/:id",async function(req,res){
        //     try{
        //         const connection=await mongoClient.connect(URL)
        //         const db=connection.db("firstdata")
        //         let students=await db.collection("firstdata").deleteOne({_id:mongodb.ObjectId(req.params.id)})//its converts string to mongodb _id
        //         await connection.close()
        //         res.json({
        //             message:"item deleted"
        //         })
        
        //     }catch(error){
        //         console.log(error)
        //     }
        // })