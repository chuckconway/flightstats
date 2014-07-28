var Client = require('node-rest-client').Client;
var sql = require('mssql');


client = new Client();


//<Setting name="Database.ConnectionString" value="Server=tcp:jexrhaqjky.database.windows.net,1433;Database=dev-cino;User ID=GPCAdmin;Password=Global1!;Trusted_Connection=False;Encrypt=True;Connection Timeout=30" />

var config = {
    user: 'groverqa@o5kpizgrtq',
    password: 'Winnemen_1',
    server: 'o5kpizgrtq.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'flightstats',
    //connectionString:'Driver={SQL Server Native Client 11.0};Server={tcp:o5kpizgrtq.database.windows.net,1433};Database={flightstats};Uid={groverqa@o5kpizgrtq};Pwd={Winnemen_1};',
    //driver:'msnode',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}


client.get("https://api.flightstats.com/flex/fids/rest/v1/json/SFO/departures?appId=d8a27a90&appKey=0377ef0bb7ce36dae31a8bcfaf38f667&requestedFields=airlineCode%2CscheduledGateDate%2CscheduledGateTime%2CflightNumber%2Ccity%2CcurrentTime%2CcurrentDate%2Cgate%2Cremarks%2CflightId%2ClastUpdatedTime%2ClastUpdatedTimeUtc%2ClastUpdatedDate%2ClastUpdatedDateUtc%2CdayOffset%2CstatusCode%2CairlineName%2CairlineLogoUrlPng%2CairlineLogoUrlSvg%2CisCodeshare%2CoperatedFlightNumber%2CoperatingAirlineName%2CoperatingAirlineCode%2CdestinationAirportName%2CdestinationAirportCode%2CdestinationCity%2CdestinationFamiliarName%2CdestinationStateCode%2CdestinationCountryCode%2Cflight%2Cdelayed%2CremarksWithTime%2CremarksCode%2CairportName%2Cterminal%2Cbaggage%2C+scheduledTime%2CscheduledDate%2CestimatedTime%2CestimatedDate%2CactualTime%2CactualDate%2CestimatedGateTime%2CestimatedGateDate%2CactualGateTime%2CactualGateDate%2CcurrentGateTime%2CcurrentGateDate%2CcodesharesAsNames%2CcodesharesAsCodes%2CuplineAirportNames%2CuplineAirportCodes%2CdownlineAirportNames%2CdownlineAirportCodes%2Cweather%2CtemperatureC%2CtemperatureF&timeFormat=24&lateMinutes=15&useRunwayTimes=false&excludeCargoOnlyFlights=true",
    function(data, response){

        var connection = new sql.connect(config, function(err) {
            if (err) {
                console.log(err);
            }

            var fids = data.fidsData;

            for(index = 0; index < fids.length;  index++) {

                var item = fids[index];
                if (item !== undefined) {
                    save(item);
                }
            }

        });
    });


function save(d) {

    console.log(d);

    var ps = new sql.Request();
    ps.input('flightId', sql.NVarChar(500), d.flightId);
    ps.input('lastUpdatedTime', sql.NVarChar(500),d.lastUpdatedTime);
    ps.input('lastUpdatedTimeUtc', sql.NVarChar(500), d.lastUpdatedTimeUtc);
    ps.input('lastUpdatedDate', sql.NVarChar(500), d.lastUpdatedDate);
    ps.input('lastUpdatedDateUtc', sql.NVarChar(500), d.lastUpdatedDateUtc);
    ps.input('dayOffset', sql.NVarChar(500), d.dayOffset);
    ps.input('statusCode', sql.NVarChar(500), d.statusCode);
    ps.input('airlineName', sql.NVarChar(500), d.airlineName);
    ps.input('airlineCode', sql.NVarChar(500), d.airlineCode);
    ps.input('flightNumber', sql.NVarChar(500), d.flightNumber);
    ps.input('airlineLogoUrlPng', sql.NVarChar(500), d.airlineLogoUrlPng);
    ps.input('airlineLogoUrlSvg', sql.NVarChar(500), d.airlineLogoUrlSvg);
    ps.input('isCodeshare', sql.NVarChar(500), d.isCodeshare);
    ps.input('operatedFlightNumber', sql.NVarChar(500), d.operatedFlightNumber);
    ps.input('operatingAirlineName', sql.NVarChar(500), d.operatingAirlineName);
    ps.input('operatingAirlineCode', sql.NVarChar(500), d.operatingAirlineCode);
    ps.input('destinationAirportName', sql.NVarChar(500), d.destinationAirportName);
    ps.input('destinationAirportCode', sql.NVarChar(50), d.destinationAirportCode);
    ps.input('destinationCity', sql.NVarChar(500), d.destinationCity);
    ps.input('destinationFamiliarName', sql.NVarChar(500), d.destinationFamiliarName);
    ps.input('destinationStateCode', sql.NVarChar(500), d.destinationStateCode);
    ps.input('destinationCountryCode', sql.NVarChar(500), d.destinationCountryCode);
    ps.input('flight', sql.NVarChar(500), d.flight);
    ps.input('delayed', sql.NVarChar(500), d.delayed);
    ps.input('remarks', sql.NVarChar(500), d.remarks);
    ps.input('remarksWithTime', sql.NVarChar(500), d.remarksWithTime);
    ps.input('remarksCode', sql.NVarChar(500), d.remarksCode);
    ps.input('airportCode', sql.NVarChar(500), d.airportCode);
    ps.input('airportName', sql.NVarChar(500), d.airportName);
    ps.input('city', sql.NVarChar(500), d.city);
    ps.input('gate', sql.NVarChar(500), d.gate);
    ps.input('terminal', sql.NVarChar(500), d.terminal);
    ps.input('scheduledTime', sql.NVarChar(500), d.scheduledTime);
    ps.input('scheduledDate', sql.NVarChar(500), d.scheduledDate);
    ps.input('estimatedTime', sql.NVarChar(500), d.estimatedTime);
    ps.input('estimatedDate', sql.NVarChar(500), d.estimatedDate);
    ps.input('currentTime', sql.NVarChar(500), d.currentTime);
    ps.input('currentDate', sql.NVarChar(500),  d.currentDate);
    ps.input('scheduledGateTime', sql.NVarChar(500), d.scheduledGateTime);
    ps.input('scheduledGateDate', sql.NVarChar(500), d.scheduledGateDate);
    ps.input('estimatedGateTime', sql.NVarChar(500), d.estimatedGateTime);
    ps.input('estimatedGateDate', sql.NVarChar(500), d.estimatedGateDate);
    ps.input('currentGateTime', sql.NVarChar(500), d.currentGateTime);
    ps.input('currentGateDate', sql.NVarChar(500), d.currentGateDate);
    ps.input('codesharesAsNames', sql.NVarChar(500), d.codesharesAsNames);
    ps.input('codesharesAsCodes', sql.NVarChar(500), d.codesharesAsCodes);
    ps.input('uplineAirportNames', sql.NVarChar(500), d.uplineAirportNames);
    ps.input('uplineAirportCodes', sql.NVarChar(500), d.uplineAirportCodes);
    ps.input('weather', sql.NVarChar(500), d.weather);
    ps.input('temperatureC', sql.NVarChar(500), d.temperatureC);
    ps.input('temperatureF', sql.NVarChar(500), d.temperatureF);

    //##missing
    //baggage
    //actualTime
    //actualGateTime
    //actualGateDate
    //downlineAirportName
    //downlineAirportCodes

    ps.query('insert into FIDS (airlineCode,scheduledGateDate,scheduledGateTime,flightNumber,city,currentTime,currentDate,gate,remarks,flightId,lastUpdatedTime,lastUpdatedTimeUtc,lastUpdatedDate,lastUpdatedDateUtc,dayOffset,statusCode,airlineName,airlineLogoUrlPng,airlineLogoUrlSvg,isCodeshare,operatedFlightNumber,operatingAirlineName,operatingAirlineCode,destinationAirportName,destinationAirportCode,destinationCity,destinationFamiliarName,destinationStateCode,destinationCountryCode,flight,delayed,remarksWithTime,remarksCode,airportName,terminal, scheduledTime,scheduledDate,estimatedTime,estimatedDate,estimatedGateTime,estimatedGateDate,currentGateTime,currentGateDate,codesharesAsNames,codesharesAsCodes,uplineAirportNames,uplineAirportCodes,weather,temperatureC,temperatureF) ' +
        'values ' +
        '(@airlineCode,@scheduledGateDate,@scheduledGateTime,@flightNumber,@city,@currentTime,@currentDate,@gate,@remarks,@flightId,@lastUpdatedTime,@lastUpdatedTimeUtc,@lastUpdatedDate,@lastUpdatedDateUtc,@dayOffset,@statusCode,@airlineName,@airlineLogoUrlPng,@airlineLogoUrlSvg,@isCodeshare,@operatedFlightNumber,@operatingAirlineName,@operatingAirlineCode,@destinationAirportName,@destinationAirportCode,@destinationCity,@destinationFamiliarName,@destinationStateCode,@destinationCountryCode,@flight,@delayed,@remarksWithTime,@remarksCode,@airportName,@terminal,@scheduledTime,@scheduledDate,@estimatedTime,@estimatedDate,@estimatedGateTime,@estimatedGateDate,@currentGateTime,@currentGateDate,@codesharesAsNames,@codesharesAsCodes,@uplineAirportNames,@uplineAirportCodes,@weather,@temperatureC,@temperatureF)', function (err, recordset) {

        if(err){
            console.log(err);
        }

        if(recordset !== undefined) {
            console.dir(recordset);
        }

    });


//    ps.prepare('insert into FIDS (airlineCode,scheduledGateDate,scheduledGateTime,flightNumber,city,currentTime,currentDate,gate,remarks,flightId,lastUpdatedTime,lastUpdatedTimeUtc,lastUpdatedDate,lastUpdatedDateUtc,dayOffset,statusCode,airlineName,airlineLogoUrlPng,airlineLogoUrlSvg,isCodeshare,operatedFlightNumber,operatingAirlineName,operatingAirlineCode,destinationAirportName,destinationAirportCode,destinationCity,destinationFamiliarName,destinationStateCode,destinationCountryCode,flight,delayed,remarksWithTime,remarksCode,airportName,terminal, scheduledTime,scheduledDate,estimatedTime,estimatedDate,estimatedGateTime,estimatedGateDate,currentGateTime,currentGateDate,codesharesAsNames,codesharesAsCodes,uplineAirportNames,uplineAirportCodes,weather,temperatureC,temperatureF) ' +
//        'values ' +
//        '(@airlineCode,@scheduledGateDate,@scheduledGateTime,@flightNumber,@city,@currentTime,@currentDate,@gate,@remarks,@flightId,@lastUpdatedTime,@lastUpdatedTimeUtc,@lastUpdatedDate,@lastUpdatedDateUtc,@dayOffset,@statusCode,@airlineName,@airlineLogoUrlPng,@airlineLogoUrlSvg,@isCodeshare,@operatedFlightNumber,@operatingAirlineName,@operatingAirlineCode,@destinationAirportName,@destinationAirportCode,@destinationCity,@destinationFamiliarName,@destinationStateCode,@destinationCountryCode,@flight,@delayed,@remarksWithTime,@remarksCode,@airportName,@terminal,@scheduledTime,@scheduledDate,@estimatedTime,@estimatedDate,@estimatedGateTime,@estimatedGateDate,@currentGateTime,@currentGateDate,@codesharesAsNames,@codesharesAsCodes,@uplineAirportNames,@uplineAirportCodes,@weather,@temperatureC,@temperatureF)', function (err) {
//
//        if (err) {
//            console.log(err);
//            return;
//        }
//
////        ps.execute(
////            {
//                airlineCode: data.airlineCode,
//                scheduledGateDate: new Date(Date.parse(data.scheduledGateDate)),
//                scheduledGateTime: data.scheduledGateTime,
//                flightNumber: data.flightNumber,
//                city: data.city,
//                currentTime: data.currentTime,
//                currentDate: new Date(Date.parse(data.currentDate)),
//                gate: data.gate,
//                remarks: data.remarks,
//                flightId: data.flightId,
//                lastUpdatedTime: data.lastUpdatedTime,
//                lastUpdatedTimeUtc: data.lastUpdatedTimeUtc,
//                lastUpdatedDate: new Date(Date.parse(data.lastUpdatedDate)),
//                lastUpdatedDateUtc: new Date (Date.parse(data.lastUpdatedDateUtc)),
//                dayOffset: data.dayOffset,
//                statusCode: data.statusCode,
//                airlineName: data.airlineName,
//                airlineLogoUrlPng: data.airlineLogoUrlPng,
//                airlineLogoUrlSvg: data.airlineLogoUrlSvg,
//                isCodeshare: data.isCodeshare,
//                operatedFlightNumber: data.operatedFlightNumber,
//                operatingAirlineName: data.operatingAirlineName,
//                operatingAirlineCode: data.operatingAirlineCode,
//                destinationAirportName: data.destinationAirportName,
//                destinationAirportCode: data.destinationAirportCode,
//                destinationCity: data.destinationCity,
//                destinationFamiliarName: data.destinationFamiliarName,
//                destinationStateCode: data.destinationStateCode,
//                destinationCountryCode: data.destinationCountryCode,
//                flight: data.flight,
//                delayed: data.delayed,
//                remarksWithTime: data.remarksWithTime,
//                remarksCode: data.remarksCode,
//                airportName: data.airportName,
//                terminal: data.terminal,
//               // baggage: data.baggage,
//                scheduledTime: data.scheduledTime,
//                scheduledDate: new Date(Date.parse(data.scheduledDate)),
//                estimatedTime: data.estimatedTime,
//                estimatedDate: new Date(Date.parse(data.estimatedDate)),
////                actualTime: data.actualTime,
////                actualDate: data.actualDate,
//                estimatedGateTime: data.estimatedGateTime,
//                estimatedGateDate: new Date(Date.parse(data.estimatedGateDate)),
////                actualGateTime: data.actualGateTime,
////                actualGateDate: data.actualGateDate,
//                currentGateTime: data.currentGateTime,
//                currentGateDate: new Date(Date.parse(data.currentGateDate)),
//                codesharesAsNames: data.codesharesAsNames,
//                codesharesAsCodes: data.codesharesAsCodes,
//                uplineAirportNames: data.uplineAirportNames,
//                uplineAirportCodes: data.uplineAirportCodes,
////                downlineAirportNames: data.downlineAirportNames,
////                downlineAirportCodes: data.downlineAirportCodes,
//                weather: data.weather,
//                temperatureC: data.temperatureC,
//                temperatureF: data.temperatureF
//
//
//            }, function (err, recordset) {
//
//                console.log(recordset);
//                console.log(err);
//
//                if(err){
//                    console.log(recordset);
//                    console.log(err);
//                }
//
//                ps.unprepare(function (err) {
//                    if(err){
//                        console.log(recordset);
//                        console.log(err);
//                    }
//
//                });
//            });
 //   });
}


//var ps = new sql.Request();
//ps.input('flightId', sql.Int, data.flightId);
//ps.input('lastUpdatedTime', sql.NVarChar(10),data.lastUpdatedTime);
//ps.input('lastUpdatedTimeUtc', sql.NVarChar(10));
//ps.input('lastUpdatedDate', sql.DateTime);
//ps.input('lastUpdatedDateUtc', sql.DateTime);
//ps.input('dayOffset', sql.Int);
//ps.input('statusCode', sql.NVarChar(10));
//ps.input('airlineName', sql.NVarChar(500));
//ps.input('airlineCode', sql.NVarChar(10));
//ps.input('flightNumber', sql.NVarChar(10));
//ps.input('airlineLogoUrlPng', sql.NVarChar(250));
//ps.input('airlineLogoUrlSvg', sql.NVarChar(250));
//ps.input('isCodeshare', sql.Bit);
//ps.input('operatedFlightNumber', sql.NVarChar(10));
//ps.input('operatingAirlineName', sql.NVarChar(250));
//ps.input('operatingAirlineCode', sql.NVarChar(50));
//ps.input('destinationAirportName', sql.NVarChar(250));
//ps.input('destinationAirportCode', sql.NVarChar(50));
//ps.input('destinationCity', sql.NVarChar(250));
//ps.input('destinationFamiliarName', sql.NVarChar(250));
//ps.input('destinationStateCode', sql.NVarChar(10));
//ps.input('destinationCountryCode', sql.NVarChar(10));
//ps.input('flight', sql.NVarChar(10));
//ps.input('delayed', sql.Bit);
//ps.input('remarks', sql.NVarChar(500));
//ps.input('remarksWithTime', sql.NVarChar(250));
//ps.input('remarksCode', sql.NVarChar(250));
//ps.input('airportCode', sql.NVarChar(10));
//ps.input('airportName', sql.NVarChar(500));
//ps.input('city', sql.NVarChar(500));
//ps.input('gate', sql.NVarChar(10));
//ps.input('terminal', sql.NVarChar(50));
//ps.input('scheduledTime', sql.NVarChar(10));
//ps.input('scheduledDate', sql.DateTime);
//ps.input('estimatedTime', sql.NVarChar(10));
//ps.input('estimatedDate', sql.DateTime);
//ps.input('currentTime', sql.NVarChar(10));
//ps.input('currentDate', sql.DateTime);
//ps.input('scheduledGateTime', sql.NVarChar(10));
//ps.input('scheduledGateDate', sql.DateTime);
//ps.input('estimatedGateTime', sql.NVarChar(10));
//ps.input('estimatedGateDate', sql.DateTime);
//ps.input('currentGateTime', sql.NVarChar(10));
//ps.input('currentGateDate', sql.DateTime);
//ps.input('codesharesAsNames', sql.NVarChar(500));
//ps.input('codesharesAsCodes', sql.NVarChar(500));
//ps.input('uplineAirportNames', sql.NVarChar(500));
//ps.input('uplineAirportCodes', sql.NVarChar(500));
//ps.input('weather', sql.NVarChar(50));
//ps.input('temperatureC', sql.Decimal(16, 2));
//ps.input('temperatureF', sql.Decimal(16, 2));