$(document).ready(function () {
	
    // reading json data file
    $.getJSON('https://msufi98.github.io/json-host/csvjson2.json', function (data) {

        // all persons deceased
        let toll = []
        for (i = 0, j = 0; i < data.length; i++) {
            if (data[i].status == "Deceased") {
                toll.push(data[i])
            }
        }
        newToll = toll
        pushArr = []
        pushArrupdate();
		let doc = new jsPDF();
		let btnSave = document.getElementById('download');
		let btnMail = document.getElementById('email');


        // update the graph using constraints added
        $(document).change(function () {
            // read filters from HTML elements
            var selectedState = $("select#states").children("option:selected").val();
            var age = $("select#age").children("option:selected").val();
            if (age != "All") {
                age = age.split("-")
                age.map(Number)
            }
            var gender = $("select#gender").children("option:selected").val();
            var predate = new Date($("input#predate").val())
            var postdate = new Date($("input#postdate").val())

            // apply filters
            newToll = toll.filter(function (a) { // state filter
                if (selectedState == "All") return true;
                return a.state == selectedState
            }).filter(function (a) { // age filter
                if (age == "All") return true;
                if (age[0] == 70) return a.ageEstimate >= 70
                return a.ageEstimate >= age[0] && a.ageEstimate <= age[1]
            }).filter(function (a) { // gender filter
                if (gender == "NA") return true;
                if (gender == a.gender) return true
            }).filter(function (a) { // date filter
                var dateParts = a.reportedOn.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                var temp = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

                if (isNaN(predate.getTime()) && isNaN(postdate.getTime())) {
                    return true
                }
                if (isNaN(predate.getTime()) && !isNaN(postdate.getTime())) {
                    return temp <=postdate
                }
                if (!isNaN(predate.getTime()) && isNaN(postdate.getTime())) {
                    return temp >=predate
                }
                return temp >= predate && temp <= postdate
                return false
            });
            pushArrupdate()
			drawChart()

        });

        // updating graph array based on constraints
        function pushArrupdate() {
            pushArr.length = 0;
            counter = {}

            for (let i = 0; i < newToll.length; i++) {

                if (!(newToll[i].reportedOn in counter)) {
                    counter[newToll[i].reportedOn] = 1;
                }
                else counter[newToll[i].reportedOn]++;
            }
            
            for (ob in counter) {
                pushArr.push([ob, counter[ob]])
            }
            
            pushArr.sort(function (a, b) {
                var dateA = new Date(a.release), dateB = new Date(b.release);
                return dateA - dateB;
            });
        }
		
		google.charts.load('current', { 'packages': ['corechart'] });

            // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

  
            // Load the Visualization API and the corechart package.
            

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {
				console.log("Calls")
				
                // Create the data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Date');
                data.addColumn('number', 'Deaths');
                data.addRows(pushArr);

                // Set chart options
                var options = {
                    'title': 'Deaths by Covid with time',
                    'width': 800,
                    'height': 300
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                chart.draw(data, options);
				
				doc.addImage(chart.getImageURI(), 0, 0);
				

				google.visualization.events.addListener(chart, 'ready', function () {
					btnSave.disabled = false;
					btnMail.disabled = false;
				});
        }
		btnSave.addEventListener("click",function() {
					console.log("here")
					console.log(doc)
					doc.save('chart.pdf');
		});
		
		btnMail.addEventListener("click",function () {
					console.log("here")
					var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])$/;
					var email = $('#emailbox').val()
					email = [email]
					console.log(typeof(email))
					console.log(email)
					if (reg.test(email)) {
						$('#msg').html("Sending")
						var pdfBase64 = doc.output('datauristring');
						document.location.href = "mailto:xyz@something.com?attachment:"+pdfBase64;
					}
					else $('#msg').html("Invalid address")

		});	

    });
});

