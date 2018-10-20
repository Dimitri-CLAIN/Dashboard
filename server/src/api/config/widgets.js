'use strict';

const moment = require('moment');
const modelGenerator = require('../models/widget/generator');

function generateWidgetsModel(widgetsConfig) {
    let services = Object.keys(widgetsConfig);
    services.forEach(function (service) {
        let serviceObj = widgetsConfig[service];
        let widgets = Object.keys(serviceObj);
        widgets.forEach(function (widget) {
            if (widget !== 'name' && widget !== 'controller') {
                let widgetObj = serviceObj[widget];
                if (widgetObj.model === undefined)
                    widgetObj.model = modelGenerator(widgetObj.modelName, widgetObj.params)
            }
        });
    });
}

let widgets = function () {
    let widgetsConfig = {
        weather: {
            name: "weather",
            current: {
                name: 'current',
                description: 'Daily weather',
                controller: require('../controllers/weather/current'),
                modelName: 'weatherCurrent',
                params: {
                    city: {type: String, default: 'Nancy'},
                    country: {type: String, default: 'France'},
                },
            },
            forecast: {
                name: 'forecast',
                description: 'Weekly weather',
                controller: require('../controllers/weather/forecast'),
                modelName: 'weatherForecast',
                params: {
                    city: {type: String, default: 'Nancy'},
                    country: {type: String, default: 'France'},
                },
            },
        },
        pokemon: {
            name: 'pokemon',
            favorite: {
                name: 'favorite',
                description: 'My favorite pokemon',
                controller: require('../controllers/pokemon/favorite'),
                modelName: 'pokemonFavorite',
                params: {
                    pokemon: {type: String, default: 'pikachu'},
                    shiny: {type: Number, default: 0}
                },
                paramsInfo: {
                    pokemon: {
                        type: 'List',
                        content: require('../controllers/pokemon/pokemon').getWidgetInfo,
                    },
                    shiny: {
                        type: 'Boolean',
                    }
                },
            },
            blind: {
                name: 'blind',
                description: 'Blindtest pokemon',
                controller: require('../controllers/pokemon/blind'),
                modelName: 'pokemonBlind',
                params: {
                    max_generation: {type: Number, default: 7},
                    min_generation: {type: Number, default: 1},
                    language: {type: String, default: 'en'},
                    shiny: {type: Number, default: 0},
                    time: {type: Number, default: 5},
                },
            },
            type: {
                name: 'type',
                description: 'Type of pokemon',
                controller: require('../controllers/pokemon/type'),
                modelName: 'pokemonType',
                params: {
                    type: {type: String, default: '1'}
                },
            }
        },
        nasa: {
            name: 'nasa',
            apod: {
                name: 'apod',
                description: 'Get picture of the day',
                controller: require('../controllers/nasa/apod'),
                modelName: 'nasaApod',
                params: {
                    date: {type: String, default: moment().format('YYYY-MM-DD')},
                    hd: {type: Number, default: 0}
                },
            },
        },
        epitech: {
            name: 'epitech',
            messages: {
                name: 'messages',
                description: 'My notification epitech',
                controller: require('../controllers/epitech/message'),
                modelName: 'epitechMessage',
                params: {
                    autologin: {type: String, default: null},
                    message: {type: String, default: 'message'}
                },
            },
            binome: {
                name: 'binome',
                description: 'My best binome',
                controller: require('../controllers/epitech/message'),
                modelName: 'epitechBinome',
                params: {
                    autologin: {type: String, default: null},
                    message: {type: Number, default: 3}
                },
            },
        }
    };
    generateWidgetsModel(widgetsConfig);
    return widgetsConfig;
};


module.exports = widgets();