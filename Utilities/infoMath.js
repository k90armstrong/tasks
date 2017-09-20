

let InfoMath = {
    // these math fundtions take in an object  {time: JSDateObj, val: int, upi: int}
    average: function (array) {
        var length = array.length;
        var sum = 0;
        for (var i = 0; i < length; i++) {
            sum += array[i].val;
        }
        return sum / length;
    },
    maximum: function (array) {
        var currentMax = array[0].val;
        var length = array.length;
        for ( var i = 0; i < length; i++) {
            if (array[i].val > currentMax) {
                currentMax = array[i].val;
            }
        }
        return currentMax;
    },
    minimum: function (array) {
        var currentMin = array[0].val;
        var length = array.length;
        for ( var i = 0; i < length; i++) {
            if (array[i].val < currentMin) {
                currentMin = array[i].val;
            }
        }
        return currentMin;
    },
    total: function (array) {
        // this function depends on the array being in order from the start date to the end date.
        return array[array.length - 1].val - array[0].val;
    },
    starts: function (array) {
        // this function needs an array objects that have binary values for obj.val
        var length = array.length;
        var starts = 0;
        var currentState = array[0].val;
        if (currentState == 1) {
            starts = 1;
        }
        for (var i = 1; i < length; i++) {
            if (array[i].val == 0) {
                currentState = 0;
            }
            if (currentState == 0 & array[i].val == 1) {
                starts++;
                currentState = 1;
            }   
        }
        return starts;
    },
    runtime: function (array) {
        // this function needs an array objects that have binary values for obj.val
        var length = array.length;
        var runtimeMillis = 0;
        var currentStartTime = 0;
        var currentState = array[0].val;
        if (currentState == 1) {
            currentStartTime = array[0].time;
        }
        for (var i = 1; i < length; i++) {
            if (array[i].val == 0 & currentState == 1) {
                currentState = 0;
                runtimeMillis += (array[i].time.getTime() - currentStartTime.getTime());
            }
            if (currentState == 0 & array[i].val == 1) {
                currentState = 1;
                currentStartTime = array[i].time;
            }   
        }
        // check if it stayed on and add that runtime
        if (array[length - 1].val == 1) {
            console.log('bfjkdsfbksd');
            runtimeMillis += (array[length - 1].time.getTime() - currentStartTime.getTime());
        }
        return runtimeMillis; // return the seconds
    },
    CONSTANTS: function (constant) {
        constant = constant.toUpperCase();
        let constants = {
            'READ': 1,
            'CONTROL': 2,
            'ACKNOWLEDGE': 4,
            'WRITE': 8,
            'POINTSCOLLECTION': 'points',
            'USERSCOLLECTION': 'Users',
            'ALARMSCOLLECTION': 'Alarms',
            'CALENDARCOLLECTION': 'Holiday',
            'SYSTEMINFOPROPERTIES': 'SystemInfo',
            'SCHEDULESCOLLECTION': 'Schedules',
            'HISTORYCOLLECTION': 'historydata',
            'USERGROUPSCOLLECTION': 'User Groups',
            'ACTIVITYLOGCOLLECTION': 'Activity Logs',
            'UPIS': 'upis'
        };

        constants.UPISCOLLECTIONS = [constants.ACTIVITYLOGCOLLECTION, constants.ALARMSCOLLECTION, constants.HISTORYCOLLECTION, constants.SCHEDULESCOLLECTION];

        return constants[constant];
    },

    resample: function(data, operation, resampleArg) {
        // data is an array of objects with the following format:
        // {time: JSDateObj, val: int, upi: int}

        // assuming data is sorted by time.
        // getting the first date
        //var tStart = new Date(data[0].time.getTime()); // making a copy of the first time object
        var tStart = new Date(data[0].time.getTime())
        
        // split deltaT into alpha and digit to ba able to build an array of times
        var parts = resampleArg.match(/([0-9]+)?([A-Za-z]+)/);
        var baseStep = parts[2];
        var multiplier = parseInt(parts[1]);
        if (!multiplier) {
            multiplier = 1
        }

        let iterateTime = function() {
            switch(baseStep) {
                case 'L':
                    currentT.setMilliseconds(currentT.getMilliseconds() + multiplier) //milliseconds
                    break;
                case 'ms':
                    currentT.setMilliseconds(currentT.getMilliseconds() + multiplier) //milliseconds
                    break;
                case 'S':
                    currentT.setSeconds(currentT.getSeconds() + multiplier) //secondly frequency
                    break;
                case 'T':
                    currentT.setMinutes(currentT.getMinutes() + multiplier) //minutely frequency
                    break;
                case 'min':
                    currentT.setMinutes(currentT.getMinutes() + multiplier) //minutely frequency
                    break;
                case 'H':
                    currentT.setHours(currentT.getHours() + multiplier) //hourly frequency
                    break;
                case 'D':
                    currentT.setDate(currentT.getDate() + multiplier) // date frequency
                    break;
                case 'W':
                    currentT.setDay(currentT.getDay() + (7 * multiplier)) //weekly frequency
                    break;
                case 'M':
                    currentT.setMonth(currentT.getMonth() + multiplier) //month end frequency
                    break;
                case 'Y':
                    currentT.setYear(currentT.getFullYear() + multiplier) // yearly frequency
                    break;
            }
            
        }

        // find the initial time we will iterate from.
        // set the time to it's initial starting point based on sample frequency.
        switch(baseStep) {
            case 'L':
                // do nothing with millis since we don't have a smaller time step than that.
                break;
            case 'ms':
                // do nothing with millis since we don't have a smaller time step than that.
                break;
            case 'S':
                tStart.setMilliseconds(0);
                break;
            case 'T':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                break;
            case 'min':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                break;
            case 'H':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                tStart.setMinutes(0);  
                break;
            case'D':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                tStart.setMinutes(0);
                tStart.setHours(0);
                break;
            case 'W':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                tStart.setMinutes(0);
                tStart.setHours(0);
                break;
            case 'M':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                tStart.setMinutes(0);
                tStart.setHours(0);
                tStart.setDate(0);
                break;
            case 'Y':
                tStart.setMilliseconds(0);
                tStart.setSeconds(0);
                tStart.setMinutes(0);
                tStart.setHours(0);
                tStart.setDate(0);
                tStart.setMonth(0);
        }

        var newData = []
        var currentT = tStart; //make a copy of the start time
        var tEnd = new Date(data[data.length - 1].time.getTime());// make a copy of the end time

        var dataStartIndex = 0; //initialize the data index

        // create the bins
        while (currentT <= tEnd) {
            newData.push({time: new Date(currentT.getTime()), val: null, upi: null})
            iterateTime();
        }
        
        for (var bin of newData){
            var binData = []
            if (newData.indexOf(bin) === newData.length-1){
                for (var d of data) {
                    if ((d.time > bin.time)) {
                        binData.push(d);
                    }
                }
            }
            else {
                for (var d of data) {
                    if ((d.time > bin.time) && (d.time < newData[newData.indexOf(bin) + 1].time)) {
                        binData.push(d);
                    }
                    else {
                        break;
                    }
                }
            }
            if (binData.length > 0) {
                var val;
                switch(operation) {
                    case 'avg':
                        val = this.average(binData);
                        break;
                    case 'max':
                        val = this.maximum(binData);
                        break;
                    case 'min':
                        val = this.minimum(binData);
                        break;
                    case 'total':
                        val = this.total(binData);
                        break;
                    case 'runtime':
                        val = this.runtime(binData);
                        break;
                    case 'starts':
                        val = this.starts(binData);
                        break;
                }
                bin.val = val;
                bin.upi = d.upi;
            }
        }

    // filling in data (only if we do not select total or runtime)
    if ((operation !== "runtime") && (operation !== "starts")){
        for (var b of newData){
            if (b.val === null){
                b.val = newData[newData.indexOf(b) - 1].val
            }
        }
    }

    return newData;
    },

    converters: {
        isNumber: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        isBool: function (n) {
            if (this.isNumber(n)) {
                return false;
            }

            return (n.toLowerCase() === 'true') ? true : (n.toLowerCase() === 'false') ? true : false;
        },

        convertBool: function (n) {
            return (this.isBool(n)) ? (n.toLowerCase() === 'true') : n;
        },

        convertNumber: function (n) {
            return (this.isNumber(n)) ? parseFloat(n) : n;
        },

        convertType: function (n, type) {
            switch (type) {
                case 'String':
                    return n.toString();
                case 'Unsigned':
                case 'UniquePID':
                case 'BitString':
                    return this.convertNumber(n);
                default:
                    return this.convertBool(this.convertNumber(n));
            }
        }
    }
}

module.exports = InfoMath;