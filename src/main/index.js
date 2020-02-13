import { app, BrowserWindow, Menu, Tray, shell } from "electron";
import contextMenu from "electron-context-menu";
import path from "path";
import store from "../stores/store";
import windowStateKeeper from "electron-window-state";
import fs from "fs";

if (process.env.NODE_ENV !== "development") {
	global.__static = require("path").join(__dirname, "/static").replace(/\\/g, "\\\\");
}

let win;
let winState;
const winURL = process.env.NODE_ENV === "development" ? "http://localhost:9080" : `file://${__dirname}/index.html`;


contextMenu({
	prepend: (defaultActions, params) => [
		{
			label: "Search Google for “{selection}”",
			visible: params.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
			},
		},
	],
});

function createWindow() {
	win = new BrowserWindow({
		"x": winState.x,
		"y": winState.y,
		"width": winState.width,
		"height": winState.height,
		minWidth: 700,
		minHeight: 500,
		frame: false,
		backgroundColor: "#262626",
		icon: `${__dirname}/logo.png`,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	win.loadURL(winURL);

	win.on("closed", () => {
		win = null;
	});
}

let tray = null;
if (!fs.existsSync("./data")) {
	fs.mkdirSync("./data");
}

let envPath = fs.realpathSync("./data");
app.setPath("userData", envPath);


app.on("ready", () => {
	winState = windowStateKeeper({
		defaultWidth: 1200,
		defaultHeight: 900,
		fullScreen: true,
	});
	createWindow();
	tray = new Tray(path.join(__dirname, "logo.png"));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: `verion ${app.getVersion()}`,
		},
		{
			label: "quit quarck",
			click: function() {
				app.quit();
			},
		},
	]);
	tray.setToolTip("quarck");
	tray.setContextMenu(contextMenu);
	tray.on("click", () => {
		if (win === null) {
			createWindow();
		} else {
			win.focus();
		}
	});
	winState.manage(win);
});

app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});
