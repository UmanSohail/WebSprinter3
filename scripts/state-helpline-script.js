$(document).ready(function(){
    // jQuery methods go here...
    jQuery.getJSON("https://api.rootnet.in/covid19-in/contacts", function(data){
        let ar = data.data.contacts.regional
        ar = ar.sort(function(a,b) {if(a.loc>b.loc)return 1; else return -1;})
        for(i = 0;i <ar.length; i++){
            $("table#StateHelpline").append("<tr><td>"+ar[i].loc+"</td><td>"+ar[i].number.split(",").join(", ")+"</td></tr>");
        }
    });
    $("table#StateHelpline").show();
  });