  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdjhUdq-S_lBu90Xnc8ddJgdg56adofUs",
    authDomain: "train-times-c374a.firebaseapp.com",
    databaseURL: "https://train-times-c374a.firebaseio.com",
    projectId: "train-times-c374a",
    storageBucket: "train-times-c374a.appspot.com",
    messagingSenderId: "275902418583"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //Click event for adding Trains
  $("#addTrain").on("click", function(event) {

    event.preventDefault();

    //Now we grab the user input(train info)
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    //Create a temporary object to put into Firebase
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrainTime: trainTime,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);
    //Does it work?
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequency);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
  });

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());

    //MORE VARIABLES!
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().firstTrainTime;
    var trainFrequency = childSnapshot.val().frequency;

    //Does it work?!
    // console.log("TRAINNAME", trainName);
    // console.log("trainDestination", trainDestination);
    // console.log(trainTime);
    // console.log(trainFrequency);

    //Create variable to store the current time subracted by the trainTime
    var timeArr = trainTime.split(":");
    var trainTimeCon = moment().hours(timeArr[0]).minutes(timeArr[1])
    var tMinutes;
    var tArrival;
    // var maxMoment = moment.max(moment(), trainTime);
    console.log("trainTimeCon", trainTimeCon)
    // if (maxMoment === trainTimeCon) {
    //     tArrival = trainTime.format("hh:mm A");
    //     tMinutes = trainTime.diff(moment(), "minutes");
    // }
    // else {
    var tMinutes = trainTimeCon.diff(moment(), "minutes");
    var differenceTimes = moment().diff(trainTimeCon, "minutes");
    var tRemainder = differenceTimes % trainFrequency;
        tMinutes = trainFrequency - tRemainder;
        // To calculate the arrival time, add the tMinutes to the currrent time
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");  
    // }
    //Get the current time 
    // var currentTime = moment(Date.now());
    // console.log("current time", currentTime);
    
    // var timeDifference = trainTime - currentTime;

    // var nextArrival = timeDifference % trainFrequency

    // console.log("next arrival", nextArrival);

    $("#trainInfo > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination +
      "</td><td>" + trainFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>")
 
})
    //Math to figure out when the next arrival is based on current time
      //If I have the when the first train leaves, and frequency, I should be able to 
      //calculate when the next train should arrive.



    //Need some math to figure out how many minutes away the train is 
      //If I have when the next train should arrive, and the current time, I can get
      //how many minutes until the next arrival time. 
        //var minutesLeft = (nextArrival - currentTime)
    //Put the data into the table

    