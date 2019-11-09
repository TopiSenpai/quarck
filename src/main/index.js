import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`

function createWindow () {
	mainWindow = new BrowserWindow({
		height: 563,
		width: 1000,
		frame: false,
		icon: __dirname + '/logo.png'
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

let tray = null
app.on('ready', () => {
	createWindow()
	tray = new Tray(path.join(__dirname, 'logo.png'))
	const contextMenu = Menu.buildFromTemplate([
		{
			label: `verion ${app.getVersion()}`,
		},
		{
			label: 'quit quarck',
			click: function () {
				app.quit()
			}
		},
	])
	tray.setToolTip('quarck')
	tray.setContextMenu(contextMenu)
	tray.on('click', () => {
		if(mainWindow === null){
			createWindow()
		}
		else{
			mainWindow.focus()
		}
	})
})

app.on('window-all-closed', () => {

})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall()
})

app.on('ready', () => {
	if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
