/**
 * User Controller
 *
 * Controlls project entities
 **/
var async = require('neo-async');
var _ = require('underscore');
var moment = require('moment');
var BookingModel = require('../model/BookingModel');
var bookingModel = new BookingModel();

var UserModel = require('../model/UserModel');
var userModel = new UserModel();

var ProjectModel = require('../model/ProjectModel');
var projectModel = new ProjectModel();

/**
 * Calculates data and labels for the booking statistics
 *
 * {
 *  hoursDay : {
 *      labels: ['3.3.2000',....],
 *      data: [[13,50,11...]]
 *  },
 *  hoursProject : {
 *      labels: ['P1',....],
 *      data: [13,50,11...]
 *  },
 *  hoursEmployee : {
 *      labels: ['Leonid Agranovskiy',....],
 *      data: [13,50,11...]
 *  }
 *
 * }
 * @param request
 * @param response
 * @param next
 */
exports.calculateBookingStatistic = function (request, response, next) {
    console.info("Calculating booking stat");
    bookingModel.listAllBookings(0, 1000, function (err, data) {
        if (err) {
            return next('Cannot calculate statistics');
        }


        async.waterfall([function (callback) {
            userModel.listPersons(function (err, persons) {
                if (err) {
                    return next('Cannot calculate statistics');
                }
                var personMap = _.indexBy(persons, 'id');
                callback(null, personMap);
            });
        }, function (personMap, callback) {
            projectModel.listProjects(function (err, projects) {
                if (err) {
                    return next('Cannot calculate statistics');
                }
                var projectMap = _.indexBy(projects, 'id');
                callback(err, personMap, projectMap);
            });
        }], function (err, personMap, projectMap) {
            if (err) {
                return next('Cannot calculate statistics');
            }
            var workTimeMap = {};
            var projectWorkTimeMap = {};
            var employeeMap = {};
            var bookingList = data.data;

            _.each(bookingList, function (booking) {
                var workTime = moment.duration(booking.workFinished - booking.workStarted).subtract(booking.pause, 'minutes').hours();
                var date = moment(booking.workDay).format('l');
                if (!workTimeMap[date]) {
                    workTimeMap[date] = 0;
                }
                workTimeMap[date] = workTimeMap[date] + workTime;

                var projectName = projectMap[booking.projectId];
                if (!projectWorkTimeMap[projectName]) {
                    projectWorkTimeMap[projectName] = 0;
                }
                projectWorkTimeMap[projectName] = projectWorkTimeMap[projectName] + workTime;


                var employee = personMap[booking.personId];
                var fullname = employee.forename + ' ' + employee.surname;

                if (!employeeMap[fullname]) {
                    employeeMap[fullname] = 0;
                }
                employeeMap[fullname] = employeeMap[fullname] + workTime;
            });

            var workTimeMapLabels = _.keys(workTimeMap);
            var workTimeMapValues = [];
            _.each(workTimeMapLabels, function (label) {
                workTimeMapValues.push(workTimeMap[label]);
            });

            var projecWorkTimeMapLabels = _.keys(projectWorkTimeMap);
            var projectMapValues = [];
            _.each(projecWorkTimeMapLabels, function (label) {
                projectMapValues.push(projectWorkTimeMap[label]);
            });

            var employeeMapLabels = _.keys(employeeMap);
            var employeeMapValues = [];
            _.each(employeeMapLabels, function (label) {
                employeeMapValues.push(employeeMap[label]);
            });

            var retVal = {
                timestamp: new Date().getTime(),
                totalEntries: bookingList.length,
                hoursDay: {
                    labels: workTimeMapLabels,
                    data: [workTimeMapValues]
                },
                hoursProject: {
                    labels: projecWorkTimeMapLabels,
                    data: projectMapValues
                },
                hoursEmployee: {
                    labels: employeeMapLabels,
                    data: employeeMapValues
                }
            }

            response.send(retVal);
        });


    })
}