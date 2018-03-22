var config = {};

config.mongohost = "127.0.0.1";
config.mongodbname = "stardibsdtr"
config.mongoConnectionURL = "mongodb://" + config.mongohost+ "/" + config.mongodbname;
config.isHTTPS = false;
//config.sslPem = "/home/admin/ssl/crosr.com.pem";
config.port = 5008;

config.defaultGuestName = "Guest";
config.defaultRoomName = "default-room";

module.exports = config;
