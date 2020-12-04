function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
    });
}

const baseBoard = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];

const IM_PATH = "./images/";
const IM_EXT = ".jpeg";

const spritesPaths = {
    wr: IM_PATH + "wr" + IM_EXT,
    wn: IM_PATH + "wn" + IM_EXT,
    wb: IM_PATH + "wb" + IM_EXT,
    wq: IM_PATH + "wq" + IM_EXT,
    wk: IM_PATH + "wk" + IM_EXT,
    wp: IM_PATH + "wp" + IM_EXT,
    br: IM_PATH + "br" + IM_EXT,
    bn: IM_PATH + "bn" + IM_EXT,
    bb: IM_PATH + "bb" + IM_EXT,
    bq: IM_PATH + "bq" + IM_EXT,
    bk: IM_PATH + "bk" + IM_EXT,
    bp: IM_PATH + "bp" + IM_EXT,
};

define("webSocketsServerPort", 8000);
define("baseBoard", baseBoard);
define("spritesPaths", spritesPaths);
