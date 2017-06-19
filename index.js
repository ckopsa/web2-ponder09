var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/postage', function(req, res) {
    urlobj = url.parse(req.url, true).query;
    console.log(urlobj.posttype);
    var result;
    var weight = Number(urlobj.weight);
    console.log(weight);
    switch (urlobj.posttype) {
    case "stamped":
        var stampedMap = new Map([[1, 0.49],
                                  [2, 0.70],
                                  [3, 0.91],
                                  [3.5, 1.12]]);
        if (weight <= 3) {
            result = stampedMap.get(Math.floor(weight));
        } else if (weight <= 3.5) {
            result = stampedMap.get(3.5);
        } else {
            result = "error";
        }
        console.log(result);
        break;
    case "metered":
        var meteredMap = Map([[1, 0.46],
                              [2, 0.67],
                              [3, 0.88],
                              [3.5, 1.09]]);
        if (weight <= 3) {
            result = meteredMap.get(Math.floor(weight));
        } else if (weight <= 3.5) {
            result = meteredMap.get(3.5);
        } else {
            result = "error";
        }
        console.log(result);
        break;
    case "parcel":
        if (weight <= 13) {
            var parcelMap = new Map([[1, 2.67],
                                     [2, 2.67],
                                     [3, 2.67],
                                     [4, 2.67],
                                     [5, 2.85],
                                     [6, 3.03],
                                     [7, 3.21],
                                     [8, 3.39],
                                     [9, 3.57],
                                     [10, 3.75],
                                     [11, 3.93],
                                     [12, 4.11],
                                     [13, 4.29]]);
            result = parcelMap.get(Math.floor(weight));
        } else {
            result = "Weight exceeds limit";
        }
        console.log(result);
        break;
    case "flat":
        if (weight <= 13) {
            var flatsMap = new Map([[[1, 0.98],
                                     [2, 1.19],
                                     [3, 1.40],
                                     [4, 1.61],
                                     [5, 1.82],
                                     [6, 2.03],
                                     [7, 2.24],
                                     [8, 2.45],
                                     [9, 2.66],
                                     [10, 2.87],
                                     [11, 3.08],
                                     [12, 3.29],
                                     [13, 3.50]]]);
            result = flatsMap.get(Math.floor(weight));
        }
        else {
            result = "Weight exceeds limit";
        }
        console.log(result);
        break;
    default:
    }
    if (typeof result == 'number') {
        result = result.toFixed(2);
    }
    res.render('pages/postage', {gets: urlobj, result: result});
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


