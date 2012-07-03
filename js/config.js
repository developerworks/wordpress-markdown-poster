var connection = {
    url : "",
    username : "",
    password : ""  
};
var wp = new WordPress(connection.url, connection.username, connection.password);


var runtime = {
    canPublish:false,
    isPublished: false
};



