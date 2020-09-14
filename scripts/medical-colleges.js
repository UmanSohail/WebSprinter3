
$(document).ready(function(){

    $("table#medicalColleges").hide();
    $("div#list1").hide();

    // jQuery methods go here...
    jQuery.getJSON("https://api.rootnet.in/covid19-in/hospitals/medical-colleges", function(data){
        let ar = data.data.medicalColleges
        let origin = $("table#medicalColleges tbody")[0].innerHTML

        for(i = 0;i <ar.length; i++){
            $("table#medicalColleges").append("<tr><td>"+ar[i].state+"</td><td>"+ar[i].name+
            "</td><td>"+ar[i].city+"</td><td>"+ar[i].ownership+"</td><td>"+ar[i].admissionCapacity+
            "</td><td>"+ar[i].hospitalBeds+"</td></tr>");
        }
        

        $('input[type=checkbox]').change(
            function(){
                uniqueStates=[]
                 uniqueTypes=[]

                console.log($(this))
                $.each($("ul.states input[type=checkbox]:checked"), function(){
                    uniqueStates.push($(this).val());
                });
                $.each($("ul.type input[type=checkbox]:checked"), function(){
                    uniqueTypes.push($(this).val());
                });
                alert("My favourite sports are: " + uniqueStates.join(", ")+ "facourite types are"+uniqueTypes.join(", "));

                var uniqueStates= uniqueStates.filter((v, i, ax) => ax.indexOf(v) === i); 
                var uniqueTypes= uniqueTypes.filter((v, i, ax) => ax.indexOf(v) === i); 


                update(uniqueStates, uniqueTypes,ar, origin)
            });
            
    });
    $("table#medicalColleges").show();
    $("div#list1").show();

  });

  update = function(uniqueStates, uniqueTypes, ar, origin) {
    $("table#medicalColleges").html(origin);
    
    for(i = 0;i <ar.length; i++){

        if(uniqueStates.includes(ar[i].state) && uniqueTypes.includes(ar[i].ownership)){
            $("table#medicalColleges").append("<tr><td>"+ar[i].state+"</td><td>"+ar[i].name+
            "</td><td>"+ar[i].city+"</td><td>"+ar[i].ownership+"</td><td>"+ar[i].admissionCapacity+
            "</td><td>"+ar[i].hospitalBeds+"</td></tr>");
        }
    }
  }

  