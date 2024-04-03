const PROXY_CONFIG = [
    {
        context: [
            "/security/"
        ],
        target: "http://localhost",
        secure: false
    }
]
module.exports = PROXY_CONFIG;