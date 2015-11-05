var AppFlowController = require('../../controller/AppFlowController');
var Constants = require('../../constants/Constants');

var DateSelector = require('./DateSelector');
var TempGraph = require('./TempGraph');

var DayWeatherDetail = require('./MainDetail/DayWeatherDetail');
var DayWeatherHeader = require('./MainDetail/DayWeatherHeader');
var SunAndMoon = require('./MainDetail/SunAndMoon');
var WindAndPressure = require('./MainDetail/WindAndPressure');


var DOM;

var countCallback = 0;


function initializeDatas() {
    if (countCallback == 0 || countCallback == 1) {
        countCallback++;
        return;
    }

    DateSelector.initItems();
    //DateSelector.refresh();

    countCallback = 0;
}

function activeComponent() {
    DOM.removeAttr('style');
    DOM.css('opacity', 0);
    DOM.animate({
        opacity: 1
    }, 500);

    setTimeout(function() {
        TempGraph.initGraph();
        DateSelector.refresh();
    }, 750);
}

function disableComponent() {
    DOM.animate({
        opacity: 0
    }, 500, function() {
        DOM.attr('style', 'display: none;');
    });
}


var WeatherDetail = {
    initialize: function($) {
        DOM = $('section#weather-detail-component');

        countCallback = 0;

        DateSelector.initialize($);
        TempGraph.initialize($);

        DayWeatherDetail.initialize($);
        DayWeatherHeader.initialize($);
        SunAndMoon.initialize($);
        WindAndPressure.initialize($);
    },

    subscribeForecastData: AppFlowController.addSubscribe(
        Constants.FlowID.GET_FORECAST_DATA,
        function() {
            initializeDatas();
        }
    ),

    subscribeTwoWeeksData: AppFlowController.addSubscribe(
        Constants.FlowID.GET_14_FORECAST_DATA,
        function() {
            initializeDatas();
        }
    ),

    subscribeSunMoonData: AppFlowController.addSubscribe(
        Constants.FlowID.GET_SUN_MOON_DATA,
        function() {
            initializeDatas();
        }
    ),

    subscribeActiveApp: AppFlowController.addSubscribe(
        Constants.FlowID.ACTIVE_APP,
        function() {
            activeComponent();
        }
    ),

    subscribeDisableApp: AppFlowController.addSubscribe(
        Constants.FlowID.DISABLE_APP,
        function() {
            disableComponent();
        }
    )
};

module.exports = WeatherDetail;