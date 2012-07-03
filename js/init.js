$(document).ready(function() {
    initializeTabs();
    initSettings();
    onSaveSettings();

});
// Initialize tabs
function initializeTabs() {
    $('ul.menu li:first').addClass('tabActive').show();
    $('#options > div').hide();
    $('#page').show();

    // click event for tab menu items
    $('ul.menu li').click(function() {

        $('ul.menu li').removeClass('tabActive');
        $(this).addClass('tabActive');
        $('#options > div').hide();

        // Get DIV ID for content from the href of the menu link
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    });
}

/**
 * Initialize connection settings
 */
function initSettings() {
    var url = $("#WordpressXmlrpcUrl");
    var username = $("#WordpressXmlrpcUsername");
    var password = $("#WordpressXmlrpcPassword");

    if (connection.url != "")
        url.val(connection.url);
    if (connection.username != "")
        username.val(connection.username);
    if (connection.password != "")
        password.val(connection.password);

    if (connection.url == "" || connection.username == "" || connection.password == "") {
        $("#messages").text("You have not set connection parameters, click 'Settings' to set it on the left.");
    }
    // Toggle button status
    if (runtime.canPublish == false) {
        $("#newPost").attr({
            disabled : "disabled"
        });
    } else {
        $("#newPost").removeAttr("disabled");
    }
}

/**
 * Re-initialize the WordPress class
 */
function reInitWordPress() {
    wp.url = connection.url;
    wp.username = connection.username;
    wp.password = connection.password;
    wp.request = new XmlRpcRequest(wp.url);
}

/**
 * Check connection parameters and toggle rumtime.panPublish flag
 * 
 * @returns {Boolean}
 */
function checkParameters() {
    if (connection.url != "" && connection.username != "" && connection.password != "") {
        runtime.canPublish = true;
        reInitWordPress();
        return true;
    }
    runtime.canPublish = false;
    modidfySettings();
    return false;
}

/**
 * Save your connection parameters info javascript object
 */
function onSaveSettings() {
    $("#saveSettings").bind('mouseup', function() {
        var url = $("#WordpressXmlrpcUrl").val();
        var username = $("#WordpressXmlrpcUsername").val();
        var password = $("#WordpressXmlrpcPassword").val();
        var savedMessage = [];
        if (url == undefined || url == "")
            savedMessage.push('<div class="errorMessage">The Wordpress Endpoint url is required</div>');
        if (username == undefined || username == "")
            savedMessage.push('<div class="errorMessage">The Username is required</div>');
        if (password == undefined || password == "")
            savedMessage.push('<div class="errorMessage">The Password is required</div>');
        if (savedMessage.length != 0)
            $("#savedMessage").html(savedMessage.join("\n"));
        connection.url = url;
        connection.username = username;
        connection.password = password;

        checkParameters();
        // console.log(connection);

        // Hidden/Display messages and Enable 'Publish' button
        if (runtime.canPublish == true) {
            $("#messages").css({
                display : "none"
            });
            $("#savedMessage").css({
                display : "none"
            });
            $("#newPost").removeAttr("disabled");
        } else {
            $("#messages").css({
                display : "normal"
            });
        }
    });
}

/**
 * Show pages when click 'Pages' tab
 * 
 * TODO:: 1. Load posts data from wordpress 2. Load javascript template to
 * render the post list page
 */
function onPages() {

}

/**
 * TODO::Display edit page with a post data from wordpress xmlrpc
 */
function onEditPage() {

}

/**
 * TODO::Do edit, and submit modified data to wordpress xmlrpc
 */
function editPage() {

}
