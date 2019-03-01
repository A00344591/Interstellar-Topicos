var config = {
  apiKey: "AIzaSyCrACR59JgKE8GqO86uahPoxeEU4JX1VYg",
  authDomain: "interstellar-topicos.firebaseapp.com",
  databaseURL: "https://interstellar-topicos.firebaseio.com",
  projectId: "interstellar-topicos",
  storageBucket: "interstellar-topicos.appspot.com",
  messagingSenderId: "328064824899"
};
firebase.initializeApp(config);

var db = firebase.firestore();

function write(nombre, decisionTomada, callback) {
	var docRef = db.collection("answers").doc(nombre);
	var allData = null;
	docRef.get().then(function(doc) {
		if (doc.exists) {
			allData = doc.data();
			var valorActual = 0;
			if (isNaN(allData[decisionTomada])) {
				valorActual = 1;
			}

			else {
				valorActual = allData[decisionTomada] + 1;
			}

			docRef.update({
				[decisionTomada]:valorActual
			})
			.then(function(){
				console.log("Document succesfully updated!");
				callback();
			})
			.catch(function(error){
				console.error("Error updating document!");
				callback();
			})
		}
		else {
			docRef.set({
				[decisionTomada]:1
			}, {merge: true})
			.then(function(){
				console.log("Document written");
				callback();
			})
			.catch(function(error){
				console.error("Error adding document: ", error);
				callback();
			})
		}
	})
}

var decisionActual = document.getElementById("seleccion1").value
var url1 = document.getElementById("url1").value;
var url2 = document.getElementById("url2").value;

document.getElementById("opc1").onclick = function () {
	var decisionTomada = document.getElementById("txt1").innerHTML;
	write(decisionActual, decisionTomada, function(){window.location.href = url1})
}

document.getElementById("opc2").onclick = function () {
	var decisionTomada = document.getElementById("txt2").innerHTML;
	write(decisionActual, decisionTomada, function(){window.location.href = url2})
}