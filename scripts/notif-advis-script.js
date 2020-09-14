$(document).ready(function(){
    // jQuery methods go here...
    jQuery.getJSON("https://api.rootnet.in/covid19-in/notifications", function(data){
        let ar = data.data.notifications

        for(i= 0; i< ar.length;i++) {
        let str = ar[i].title;
        console.log(str)
        let patt1 = /[0-9][0-9](.)[0-9][0-9](.)[0-9][0-9][0-9][0-9]/g;
        let result = str.match(patt1);
        if(result == null || result == undefined) result =[""];
        ar[i].date = result[0]
        ar[i].title = ar[i].title.replace(result,"")
        }

        ar = ar.sort(function(a,b) {
            console.log(a,b)
            c = a.date.split(".");
            d = b.date.split(".");
            if(c[2] > d[2]) return -1;
            else if (c[2]==d[2] && c[1] > d[1]) return -1;
            else if (c[2]==d[2] && c[1] == d[1] && c[0] > d[0]) return -1;
            return 1;
        })
        for(i = 0;i <ar.length; i++){
            $("table#notifadvis").append(`<tr><td>${ar[i].date}</td><td>${ar[i].title}</td><td><a href="${ar[i].link}">${ar[i].link}</a></td></tr>`);
        }
    });
    $("table#notifadvis").show();
  });

getDate = function(a) {
    a.split(" ");
    return a[0];
};
getTitle = function(a) {
    
}