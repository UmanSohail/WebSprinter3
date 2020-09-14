$(document).ready(function(){
    // jQuery methods go here...
    jQuery.getJSON("https://api.rootnet.in/covid19-in/hospitals/beds", function(data){
        let ar = data.data.regional
        let ind = ar.pop();
        //console.log(ar);
        ar = ar.sort(function(a,b) {
            if(a.state>b.state)return 1; else return -1;})
        ar.push(ind)
        for(i = 0;i <ar.length; i++){
            console.log(ar[i])
            $("table#hospitals").append("<tr><td>"+ar[i].state+"</td><td>"+ar[i].ruralHospitals+
            "</td><td>"+ar[i].ruralBeds+"</td><td>"+ar[i].urbanHospitals+"</td><td>"+ar[i].urbanBeds+
            "</td><td>"+ar[i].totalHospitals+"</td><td>"+ar[i].totalBeds+"</td></tr>");
        }
    });
    $("table#hospitals").show();
  });