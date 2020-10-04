# meet-bridge(Discarded)

[![npm version](https://badge.fury.io/js/meet-bridge.svg)](https://badge.fury.io/js/meet-bridge)
[![js deliver](https://data.jsdelivr.com/v1/package/npm/meet-bridge/badge)](https://www.jsdelivr.com/package/npm/meet-bridge)

This Project is discarded now, we strong recommend use [meet-js-sdk](https://www.npmjs.com/package/meet-js-sdk)

## Introduction

The Bridge Library for Meet.ONE Client

This library is used to assist to generating the protocol URI of the client, and encapsulates some common protocols and methods.

[API Docs](https://meet-common.gitlab.io/fe/meet-bridge/)

[Live Demo@1.x.x](https://meet.one/test/index.html)

[Live Demo@2.x.x](https://meet.one/test/index@2.html)

## How to invoke protocol - Promise callback styles (Version >= 2.0.0)

Library will support Promise callback styles code after `2.0.0` or later.

The following is an example of how to invoke protocol to ask for authorize.

```js
var bridge = new MeetBridge() // 1. Creates an instance of Bridge.

bridge
  .invokeAuthorizeInWeb()
  .then(function(result) {
    // handler success
    console.log(result)
  })
  .catch(function(error) {
    // handler error
    console.error(error)
  })
```

## How to generate protocol uri (Version < 2.0.0)

The following is an example of how to generate protocol uri to ask for authorize

```js
var bridge = new MeetBridge() // 1. Creates an instance of Bridge.

// 2. generate autorize protocol uri
var uri = bridge.invokeAuthorize({
  scheme: 'moreone', // the callback of protocol scheme
  redirectURL: 'http://more.one', // When callback failed (eg.protocol doesn't response) will redirect to URL(common like dapps' homepage)
  dappName: 'MORE.ONE', // Dapps' name
  dappIcon: 'https://static.ethte.com/more/images/icon/icon60pt.png', // Dapps' icon URL
  loginMemo: 'The EOS Candy Box'
})

// 3. After the protocol URI address is generated, the web terminal can communicate with the client through the following two calling methods.
window.location.href = uri
window.postMessage(uri)
```

## How to receive message from client (Version < 2.0.0)

Receiving and parsing the things returned by the client can be achieved by listening to the `Message` event.

```js
window.document.addEventListener('message', function(e) {
  const message = e.data // receive original message
  document.getElementById('receive').innerHTML = messgae

  // can also be directly converted to an Object using `Bridge.revertParamsToObject(params)`;
  const { params } = JSON.parse(message)
  document.getElementById('decode').innerHTML = decodeURIComponent(atob(params))
})
```

## CHANGELOG

执行 npm update meet-bridge 升级库

- v2.2.0

  - 无

- v2.1.0
  1.  初始化 meet-bridge 进行判断,避免重复监听 message 事件
  2.  支持多次回调的协议生成方法
  3.  支持自定义 webview 右上角标题及点击事件回调
