const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const express = require('express'), i18n = require("i18n");
require('electron-reload')(__dirname)
let win
const createWindow = () => {
  win = new BrowserWindow({
    title: 'Refresh Browser',
    useContentSize: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      backgroundThrottling: false
    }
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/main/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools()
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
i18n.configure({
  locales:['en', 'de'],
  register: global,
  directory: path.join(__dirname, '/locale')
})
i18n.setLocale('en');
console.log(__('hello'))