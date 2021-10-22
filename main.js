// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, session} = require('electron')
const path = require('path')


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'RCC APP - One Step Ahead :)',
    webPreferences: {
      plugins: true,
      enableRemoteModule: true,
      nodeIntegration: true,
      webSecurity: false,
      webviewTag: true,
      allowRunningInsecureContent: true,
    }
  })

  mainWindow.setContentProtection(false)

  // and load the index.html of the app.
  mainWindow.loadURL('https://exams.smartclassapp.in/')

  // mainWindow.webContents.openDevTools();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  const mainMenuTemplate = [
    {label: 'Go Back',
     click() { 
      mainWindow.webContents.goBack()
   }},
   {label: 'logout',
     click() { 
      mainWindow.loadURL('https://exams.smartclassapp.in/student/sign_out')
   }},
    {label: 'About RCC1.'}
  ]
  

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
  
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  const cookie = { url: 'https://exams.smartclassapp.in', name: 'electron', value: "YES-9890" }
   session.defaultSession.cookies.set(cookie)
   .then(() => {
      // success
      console.log("Cookie set....")
   }, (error) => {
      console.error(error)
   })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // Using require
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
    console.log(`Added Extension:  ${name}`);
})
.catch((err) => {
    console.log('An error occurred: ', err);
});
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// const win = new BrowserWindow()
app.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
