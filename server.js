const mongoose = require('mongoose');
var List = require('./models/ToDo.js'); 
var Item = require('./models/ToDoItem.js'); 
//Load in the express module
const express = require('express');  
const path = require('path');

//creates a new express application 
const app = express(); 
//declare the port we want to connect to 
const port = 3000; 

const mongoDB = 'mongodb://shanesamborski:machine112@cluster0-shard-00-00.mn4kh.mongodb.net:27017,cluster0-shard-00-01.mn4kh.mongodb.net:27017,cluster0-shard-00-02.mn4kh.mongodb.net:27017/ToDoListApp?ssl=true&replicaSet=atlas-732wwi-shard-0&authSource=admin&retryWrites=true&w=majority'; 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 
const db = mongoose.connection;
//open a connection to the database 
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//use just says, use the following middleware: 
app.use(
    //express.static: is middleware for delivering static files
    //like html, css, javascript, images, etc. 
    express.static(
        //basically this just takes care of relative paths 
        path.join(__dirname, 'public')
        )
    );

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//opening up our server to listen on a specific ip address and port 
//ip addresses are also known as hostnames 
app.listen(port, function(){
    console.log("The server is running at port " + port); 
});

/* our api calls */ 
/* Retrieve List
Retrieve Specific Item in List
*/ 

//127.0.0.1:3000/items 
app.get('/items', function(request, response){
    /*get data*/ 
    Item.find(function(err, items){
            if (err) return console.error(err);
            response.send(items); 
    });    
}); 

//Add a app.post to send some data and save it 

app.post('/items', function(request, response){
    let newData = new Item(request.body); 
    newData.save(function(error,item){
        if(error) { console.log(error); 
            response.sendStatus(500);     
        }
        console.log("Success, item added!"); 
        response.sendStatus(200); 
    }); 

});

//Add a app.put call to update some data

app.delete('/items/:id', function(request, response){
    console.log(request.params.id);
    Item.deleteOne({ _id : request.params.id }, function (err) {
        if (err){ console.log(err); return; }
        response.sendStatus(204); 
      });  
});

app.put('/items', function (request, response){
    
})
//Add a app.delete call to delete some data 

// /* Jeff */ 
// ///127.0.0.1:3000/medium 
// app.get('/medium', function (request, response) {
//     let myVal = Item.find({
//         itemPriority: "Medium" // traverse through list and find an item by priority
//     },
    
//     function (error, anArrayOfMediumPriorityItems) {
//         if (error) return console.error(error);
//         response.send(anArrayOfMediumPriorityItems);
//     });


// });

// /*ryan */ 
// //http://127.0.0.1:3000/tasks/5fc90ebc5a6168f0f3f89458
// app.get('/tasks/:id', (request, response) => {
//     let myQuery = Item.findOne({ _id: request.params.id }); 

//     //do other stuff 
//     myQuery.exec((err, item) => {
//         if (err) return console.error(err);
//         response.send(item);
//     });

// });
/*
 app.post('/item', function(request, response){
     //use the request data to create a new item 
     //and add it to my database. 
     console.log(request); 
     let item1 = new Item({
         itemName     : "Do Dishes",
         itemPriority : "High" ,
         assignee     : "Willie",
         completed    : false  
     }); 

     item1.save(function(err, item){
         if (err) return console.error(err);
         console.log(item); 
     }); 
 });
/*


/* 
//open another connection to the database 
db.once('open', function(){
    console.log("We're connected");
    
    //create a new item instance using the Item model
    let item1 = new Item({
        itemName     : "Do Dishes",
        itemPriority : "High" ,
        assignee     : "Willie",
        completed    : false  
    }); 

    item1.save(function(err, item){
        if (err) return console.error(err);
        console.log(item); 
    }); 
     //how to add more items to the list
    item2 = new Item({
        itemName     : "Walk the dog",
        itemPriority : "High" ,
        assignee     : "Willie",
        completed    : false  
    }); 

    item2.save(); 

    //create new list with our item. 
    var myList = new List({
        name : "Willie's List",
        items : [
            {
            item : item1._id 
            },
            {
            item : item2._id 
            }
            ],
    }); 

    //how to find an item in the item schema 
    Item.findById(item1._id, function(err, item){
        console.log(item1); 
    })

    Item.find({itemName : 'Grocery Shopping'},function (err, items){
        if (err) return console.error(err);
        console.log(items);
        });

    Item.find({
            itemPriority: "Medium" // traverse through list and find an item by priority
            }, function(err, items){
                if (err) return console.error(err);
                console.log(items)
            });
            
    //finding an item from a list 
    List.find({item: item1._id}, function(err, items){
        console.log(items); //what will be inside this object 
        /*[   {
        item : ItemID("30980230diuao03")
            }   ] */
 /*   }); 


    //how to update an item
    Item.findOneAndUpdate({name: 'Do Laundry'}, {priority: 'Low'}, function(err, item){
        console.log('item updated')
    });

    Item.findById(item1._id, function (err, item) {
        if (err) return handleError(err); //they check to see if 
        //the data is good 
        
        item.set({ priority: 'Low' }); //they update the value of the 
        //size property to large 
      
        item.save(function (err, updatedItem) {
          if (err) return handleError(err); //check for erros in saving
          console.log(updatedItem); //response to the client with an updated tank
        }); 
      });

    //how to delete an item 
    Item.findOneAndDelete({itemId : item1._id}, function(err,item){
        console.log("deleted: ");
        console.log(item); 
    });

    myList.save(); //add callback to error check if we wanted

    
});
*/ 