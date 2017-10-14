var config = {
    apiKey: "AIzaSyCndXs0MJJ6qmb-U2fOQTioSIeg-lCOHqI",
    authDomain: "trains-6006e.firebaseapp.com",
    databaseURL: "https://trains-6006e.firebaseio.com",
    projectId: "trains-6006e",
    storageBucket: "trains-6006e.appspot.com",
    messagingSenderId: "564652194339"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-ChooChoo-btn").on("click", function (event) {

    var chooName
    var chooDestination;
    var chooFirst;
    var chooFrequency;
    console.log("ChoochooBtn");

    chooName = $("#ChooChoo-name-input").val().trim();
    console.log(chooName);
    chooDestination = $("#ChooChoo-Destination-input").val().trim();
    console.log(chooDestination);
    chooFirst = moment($("#FirstTrain-input").val().trim(), "HH:mm").format("X");
    console.log(chooFirst);
    chooFrequency = $("#Frequency-input").val().trim();
    console.log(chooFrequency);

    var newChoo = {
        name: chooName,
        destination: chooDestination,
        first: chooFirst,
        frequency: chooFrequency
    };

    database.ref('/Choo').push(newChoo);

})

database.ref('/Choo').on("child_added", function (childSnapshot, prevChildKey) {

    var chooName
    var chooDestination;
    var chooFirst;
    var chooFrequency;
    chooName = childSnapshot.val().name;
    console.log(chooName);
    chooDestination = childSnapshot.val().destination;
    console.log(chooDestination);
    chooFirst = childSnapshot.val().first;
    console.log(chooFirst);
    chooFrequency = childSnapshot.val().frequency;
    console.log(chooFrequency);

    var now = moment();

    now = now.add(chooFrequency,"m");
    now = now.format("HH:mm");

    console.log("this is now " + now)

   $("#ChooChoo-table > tbody").append("<tr><td>" + chooName + "</td><td>" + chooDestination + "</td><td>" +
    chooFrequency + "</td><td>" + now + "</td><td>");

});