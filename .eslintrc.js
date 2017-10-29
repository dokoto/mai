module.exports = {
    "extends": "airbnb-base",
    "globals": {
        "TARGET": true,
        "PLATFORM": true,
        "VERSION": true,
        "REST_API": true,
       "LANGUAGE": true,
    },
    "rules": {
        "no-param-reassign": 0,
        "no-console": [
            "error",
            { 
                "allow": ["warn", "error", "log", "debug"] 
            }
        ]
    }
};