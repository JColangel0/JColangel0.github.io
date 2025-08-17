let NUM_YEARS = 128;
var canvas = document.getElementById("timeline");
var ctx = canvas.getContext("2d");
canvas.width = Math.max(0.9 * screen.width, 680);
canvas.height = (NUM_YEARS * 20) + 320;

var colors = {};
colors[1897] = "#b7b6b4";
colors[1938] = "#ffd700";
colors[1956] = "#727171";
colors[1970] = "#cd7f32";
colors[1985] = "#2d2d2d";
colors[2004] = "#0000ff";
colors[2011] = "#00ff00";

var titles = [
    ["Platinum Age Of Comics", "1897 - 1938"],
    ["Golden Age Of Comics", "1938 - 1956"],
    ["Silver Age Of Comics", "1956 - 1970"],
    ["Bronze Age Of Comics", "1970 - 1985"],
    ["Dark Age Of Comics", "1985 - 2004"],
    ["Modern Age Of Comics", "2004 - 2011"],
    ["Post Modern Age Of Comics", "2011 - Present"]
];

var inner_titles = [
    ["Marvel Age Of Comics", "1960-1970"],
    ["Iron Age Of Comics", "1985-2011"]
];

var links = [
    "Articles/PlatinumAge.htm",
    "Articles/GoldenAge.htm",
    "Articles/SilverAge.htm",
    "Articles/BronzeAge.htm",
    "Articles/DarkAge.htm",
    "Articles/ModernAge.htm",
    "Articles/PostModernAge.htm",
    "Articles/MarvelAge.htm",
    "Articles/IronAge.htm"
];

var inner_colors = {};
inner_colors[1960] = "#FF0000";
inner_colors[1985] = "#A59C94";

var blocked = [];
var blocked_col_two = [];

var FIRST_YEAR = 1897;

canvas.addEventListener("click", clickHandler, false);

function clickHandler(e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;

    for (var i = 0; i < blocked.length; ++i) {
        console.log(blocked[i][0], blocked[i][2], blocked[i][1], blocked[i][3]);
        if (y > blocked[i][0] && y < blocked[i][1] && x > blocked[i][2] && x < blocked[i][3]) {
            window.open(links[i], "_self");
        }
    }
}

function drawBrick(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawOutline(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

function writeText(text, x, y, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "start";
    ctx.fillText(text, x, y);
}

function writeBox(text, x, y, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

function genColor(year) {
    var color = "NULL";
    let keys = Object.keys(colors);
    for (var i = 0; i < keys.length - 1; ++i) {
        if (keys[i] == year) {
            color = colors[keys[i]];
            break;
        }

        if (year >= keys[i] && year < keys[i+1]) {
            color = colors[keys[i]];
            break;
        }
    }
    if (color == "NULL")
        color = colors[keys[keys.length-1]];
    return color;
}

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

function intersecting_col_one(y, height) {
    for (var i = 0; i < blocked.length; ++i) {
        if (y >= blocked[i][0] && y <= blocked[i][1]) {
            return true;
        } 
        
        if (y + height >= blocked[i][0] && y + height <= blocked[i][1]) {
            return true;
        }
    }

    return false;
}

function intersecting_col_two(y, height) {
    for (var i = 0; i < blocked_col_two.length; ++i) {
        if (y >= blocked_col_two[i][0] && y <= blocked_col_two[i][1]) {
            return true;
        }

        if (y + height >= blocked_col_two[i][0] && y + height <= blocked_col_two[i][1]) {
            return true;
        }
    }

    return false;
}

function wordify(text) {
    var words = [];

    var string = "";
    var i = 0;
    while (i < text.length) {
        string += text[i];
        if (text[i] == ' ') {
            words.push(string);
            string = "";
        }
        ++i;
    }
    words.push(string);

    return words;
}

function printContent(id, x, y) {
    var content = [];
    var text = document.getElementById(id).innerText;
    var words = wordify(text);
    var sentence = "";
    var j = 0;
    while (j < words.length) {
        ctx.font = "18px Arial Narrow";
        if (ctx.measureText(sentence+words[j]).width < 390) {
            sentence += words[j];
            ++j;
        } else {
            content.push(sentence);
            sentence = "";
        }
    }
    content.push(sentence);
    for (var k = 0; k < content.length; ++k) {
        writeBox(content[k], x+195, y+35, "18px Arial Narrow", "#000");
        y += 18;
    }
}

function drawInnerBlock(i, top_offset, color) {
    var radius = 8;
    var height = ((i-FIRST_YEAR+2)*20)+top_offset-radius;
    
    var start_x = 90;
    var mid_x = start_x+100;
    var end_x = 850;

    var line_height = height;

    while (intersecting_col_one(line_height, 50)) {
        line_height -= 10;
    }

    drawCircle(start_x, height, radius, "#000");
    drawCircle(start_x, height, radius-2.5, color);
    drawCircle(start_x, height, radius-5, "#000");

    drawLine(start_x, height-radius+1, mid_x, line_height);
    drawLine(mid_x, line_height, end_x, line_height);

    var top_left = line_height;
    var box_height = 300;
    var box_width = 400;

    while (intersecting_col_two(top_left, box_height+50)) {
        top_left -= 5;
    }

    var index = blocked_col_two.length - 2;

    drawOutline(end_x, top_left, box_width, box_height);
    blocked_col_two.push([top_left, top_left+box_height, end_x, end_x+box_width]);

    for (var j = 0; j < inner_titles[index].length; ++j) {
        writeText(inner_titles[index][j], end_x+10, top_left+30, "bold 30px Arial Narrow", "#000");
        top_left += 30;
    }

    printContent(inner_titles[index][0], end_x+5, top_left);
}

function drawBlock(i, top_offset, color, up) {
    var radius = 8;
    var height = ((i-FIRST_YEAR+4)*20)+top_offset-radius;
    var circle_color = "#000";

    var distance = 200;
    var top_left;

    var box_width = 400;
    var box_height = 300;

    var start_x = 70 + radius;

    var col = 1;

    if (up) {
        top_left = height;
    } else {
        top_left = height - 200;
    }

    while (intersecting_col_one(height-100, 100)) {
        height += 10;
    }

    if (intersecting_col_one(top_left, box_height)) {
        distance = distance * 3 + 50;
        col = 2;
    }

    if (color == "#2d2d2d" || color == "#0000ff") {
        circle_color = "#FFF";
    }

    drawCircle(70, height, radius, circle_color);
    drawCircle(70, height, radius-2.5, color);
    drawCircle(70, height, radius-5, circle_color);
    drawLine(start_x, height, 70+distance, height);

    if (!up) {
        drawLine(70+distance, height, 180+distance, height-100);
    } else {
        drawLine(70+distance, height, 180+distance, height+100);
    }

    drawOutline(180+distance, top_left, box_width, box_height);

    if (col == 1) {
        blocked.push([top_left, top_left+box_height, 180+distance, 180+distance+box_width]);
    } else if (col == 2) {
        blocked_col_two.push([top_left, top_left+box_height, 180+distance, 180+distance+box_width]);
    }

    var index = blocked.length + blocked_col_two.length - 1;

    for (var j = 0; j < titles[index].length; ++j) {
        writeText(titles[index][j], 190+distance, top_left+30, "bold 30px Arial Narrow", "#000");
        top_left += 30;
    }

    printContent(titles[index][0], 185+distance, top_left);
}

function buildLine() {
    var top_offset = 10;
    var color = "#FFF";

    for (var i = 0; i < NUM_YEARS; ++i) {
        var color = genColor(FIRST_YEAR+i);

        if ((i+FIRST_YEAR) % 5 == 0) {
            writeText(FIRST_YEAR+i, 10, (i*20)+top_offset+16, "20px Arial", "#000");
        } else if (i+1 == NUM_YEARS) {
            writeText(FIRST_YEAR+i+1, 10, (i*20)+top_offset+16, "20px Arial", "#000");
        } else if (i == 0) {
            writeText(FIRST_YEAR, 10, (i*20)+top_offset+16, "20px Arial", "#000");
        }

        drawBrick(60, (i*20)+top_offset, 20, 20, color);
        if (i+FIRST_YEAR >= 1960 && i+FIRST_YEAR < 1970) {
            drawBrick(80, (i*20)+top_offset, 20, 20, inner_colors[1960]);
        } else if (i+FIRST_YEAR >= 1985 && i+FIRST_YEAR < 2011) {
            drawBrick(80, (i*20)+top_offset, 20, 20, inner_colors[1985]);
        }
    }

    let keys = Object.keys(colors);
    var up = false;
    for (var i = 0; i < keys.length; ++i) {
        up = !up;
        drawBlock(keys[i], top_offset, colors[keys[i]], up);
    }

    keys = Object.keys(inner_colors);
    for (var i = 0; i < keys.length; ++i) {
        drawInnerBlock(keys[i], top_offset, inner_colors[keys[i]]);
    }
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    buildLine();
}

main();