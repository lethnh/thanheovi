// let socket = io();
// let el;

// socket.on('time', (timeString) => {
//     el = document.getElementById('server-time');
//     el.innerHTML = 'Server time: ' + timeString;
// });
// // $(function () {
// //     var socket = io();
// $('form').submit(function () {
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
// });
// socket.on('chat message', function (msg) {
//     $('#messages').append($('<li>').text(msg));
//     window.scrollTo(0, document.body.scrollHeight);
// });
// socket.on('newclientconnect', function (data) {
//     $('#newclientconnect').text(data.description);
//     // document.body.innerHTML = '';
//     // document.write(data.description);
// });
// socket.on('broadcast', function (data) {
//     $('#clients').text(data.description);
//     // document.body.innerHTML = '';
//     // document.write(data.description);
// });
// // });

$(function () {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  var emojis = {
    'o/': '👋',
    '</3': '💔',
    '<3': '\u2764\uFE0F',
    '8-D': '😁',
    '8D': '😁',
    ':-D': '😁',
    '=-3': '😁',
    '=-D': '😁',
    '=3': '😁',
    '=D': '😁',
    'B^D': '😁',
    'X-D': '😁',
    'XD': '😁',
    'x-D': '😁',
    'xD': '😁',
    ':\')': '😂',
    ':\'-)': '😂',
    ':-))': '😃',
    '8)': '😄',
    ':)': '\uD83D\uDE03',
    ':-)': '😄',
    ':3': '😄',
    ':D': '\uD83D\uDE00',
    ':]': '😄',
    ':^)': '😄',
    ':c)': '😄',
    ':o)': '😄',
    ':}': '😄',
    ':っ)': '😄',
    '=)': '😄',
    '=]': '😄',
    '0:)': '😇',
    '0:-)': '😇',
    '0:-3': '😇',
    '0:3': '😇',
    '0;^)': '😇',
    'O:-)': '😇',
    '3:)': '😈',
    '3:-)': '😈',
    '}:)': '😈',
    '}:-)': '😈',
    '*)': '😉',
    '*-)': '😉',
    ':-,': '😉',
    ';)': '😉',
    ';-)': '😉',
    ';-]': '😉',
    ';D': '😉',
    ';]': '😉',
    ';^)': '😉',
    ':-|': '😐',
    ':|': '😐',
    ':(': '😒',
    ':-(': '😒',
    ':-<': '😒',
    ':-[': '😒',
    ':-c': '😒',
    ':<': '😒',
    ':[': '😒',
    ':c': '😒',
    ':{': '😒',
    ':っC': '😒',
    '%)': '😖',
    '%-)': '😖',
    ':-P': '😜',
    ':-b': '😜',
    ':-p': '😜',
    ':-Þ': '😜',
    ':-þ': '😜',
    ':P': '😜',
    ':b': '😜',
    ':p': '😜',
    ':Þ': '😜',
    ':þ': '😜',
    ';(': '😜',
    '=p': '😜',
    'X-P': '😜',
    'XP': '😜',
    'd:': '😜',
    'x-p': '😜',
    'xp': '😜',
    ':-||': '😠',
    ':@': '😠',
    ':-.': '😡',
    ':-/': '😡',
    ':/': '😡',
    ':L': '😡',
    ':S': '😡',
    ':\\': '😡',
    '=/': '😡',
    '=L': '😡',
    '=\\': '😡',
    ':\'(': '😢',
    ':\'-(': '😢',
    '^5': '😤',
    '^<_<': '😤',
    'o/\\o': '😤',
    '|-O': '😫',
    '|;-)': '😫',
    ':###..': '😰',
    ':-###..': '😰',
    'D-\':': '😱',
    'D8': '😱',
    'D:': '😱',
    'D:<': '😱',
    'D;': '😱',
    'D=': '😱',
    'DX': '😱',
    'v.v': '😱',
    '8-0': '😲',
    ':-O': '😲',
    ':-o': '😲',
    ':O': '😲',
    ':o': '😲',
    'O-O': '😲',
    'O_O': '😲',
    'O_o': '😲',
    'o-o': '😲',
    'o_O': '😲',
    'o_o': '😲',
    ':$': '😳',
    '#-)': '😵',
    ':#': '😶',
    ':&': '😶',
    ':-#': '😶',
    ':-&': '😶',
    ':-X': '😶',
    ':X': '😶',
    ':-J': '😼',
    ':*': '😽',
    ':^*': '😽',
    'ಠ_ಠ': '🙅',
    '*\\0/*': '🙆',
    '\\o/': '🙆',
    ':>': '😄',
    '>.<': '😡',
    '>:(': '😠',
    '>:)': '😈',
    '>:-)': '😈',
    '>:/': '😡',
    '>:O': '😲',
    '>:P': '😜',
    '>:[': '😒',
    '>:\\': '😡',
    '>;)': '😈',
    '>_>^': '😤',
  };

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box

  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page
  var image;

  // Prompt for setting a username, a avatar
  var username;
  var avatar;

  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  const addParticipantsMessage = (data) => {
    var message = '';
    // if (data.numUsers === 1) {
    //   message += "there's 1 participant";
    // } else {
    //   message += "Đang có " + data.numUsers + " người hoạt động";
    // }
    log(message);
    console.log(data);
    logUser(data.users);
  }

  function escapeSpecialChars(regex) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
  }

  // Sets the client's username
  const setUsername = () => {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username && avatar) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', {
        username: username,
        avatar: avatar
      });
    } else {
      alert("Làm ơn nhập nickname + avatar")
    }
  }

  // Sends a chat message
  const sendMessage = () => {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      // debugger
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Log a message
  const log = (message, options) => {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Log a message
  const logUser = (users) => {
    debugger
    $('.list-users .list').html("");
    for (let index = 0; index < users.length; index++) {
      // $('.list-users .list').append($('<li>').addClass('log-user').text(users[index]));
      $('.list-users .list').append(`<li class="log-user">
      <span><img class="rounded-circle avatar" src="${users[index].avatar}" alt="" />${users[index].username}</span>
  </li>`)
      // addMessageElement($el, options);
    }
    // addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  const addChatMessage = (data, options) => {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);
    var $userNameMe = `<p class="sentText pr-10">${data.username}</p>`
    var $messageBodyMe = `<div class="messageBox backgroundBlue">
      <p class="messageText colorWhite">${data.message}</p>
    </div>`
    var $isTyping = `<div><img style="
    width: 50px;"   src="/assets/images/800.gif" /></div>`;
    var typingClass = data.typing ? 'typing' : '';
    if (username == data.username) {
      var $messageDiv = $('<div class="messageContainer message jusify-cotent-end"/>')
        .data('username', data.username)
        .addClass(typingClass)
        .append($messageBodyMe);
    } else {
      if (typingClass) {
        var $messageDiv = $('<div class="messageContainer message justify-content-start"/>')
          .data('username', data.username)
          .addClass(typingClass)
          .append($usernameDiv, $isTyping);
      } else {
        var $messageDiv = $('<div class="messageContainer message justify-content-start"/>')
          .data('username', data.username)
          .addClass(typingClass)
          .append($usernameDiv, $messageBodyMe);
      }
    }

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  const addChatTyping = (data) => {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  const removeChatTyping = (data) => {
    debugger
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  const addMessageElement = (el, options) => {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $($messages[0]).parent()[0].scrollTop = $($messages[0]).parent()[0].scrollHeight;
  }

  // Prevents input from having injected markup
  const cleanInput = (input) => {
    return $('<div/>').text(input).html();
  }

  // Updates the typing event
  const updateTyping = () => {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(() => {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  function readFile() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      debugger
      FR.addEventListener("load", function (e) {
        image = `<img width="100%" src=${e.target.result} />`;
        if (username) {
          sendMessageImage();
          socket.emit('stop typing');
          typing = false;
        }
      });
      FR.readAsDataURL(this.files[0]);
    }
  }

  function readFile2() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      debugger
      FR.addEventListener("load", function (e) {
        $('.avatarInput, .avatar-label').addClass("d-none");
        document.getElementById('avatar-fake').src = e.target.result;
        avatar = e.target.result
      });
      FR.readAsDataURL(this.files[0]);
    }
  }

  // Sends a chat message
  const sendMessageImage = () => {
    $inputMessage.val('');
    addChatMessage({
      username: username,
      message: image
    });
    // tell server to execute 'new message' and send along one parameter
    socket.emit('new message', image);
    // }
  }

  document.getElementsByClassName("avatarInput")[0].addEventListener("change", readFile2);
  $('#avatar-fake').click(function () {
    $('#avatar-input').click();
  });

  document.getElementById("file-input").addEventListener("change", readFile);

  // Gets the 'X is typing' messages of a user
  const getTypingMessages = (data) => {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  const getUsernameColor = (username) => {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $window.keydown(event => {
    debugger
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username && avatar) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', (e) => {
    console.log('demo');
    for (var i in emojis) {
      var regex = new RegExp(escapeSpecialChars(i), 'gim');
      e.target.value = e.target.value.replace(regex, emojis[i]);
    }
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(() => {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(() => {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', (data) => {
    debugger
    connected = true;
    // Display the welcome message
    var message = "Welcome to page Luôn Vui TƯơi Chat";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', (data) => {
    debugger
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) => {
    log(data.username + ' joined');
    logUser(data.users);
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', (data) => {
    log(data.username + ' left');
    logUser(data.users);
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', (data) => {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', (data) => {
    removeChatTyping(data);
  });

  socket.on('disconnect', () => {
    log('you have been disconnected');
  });

  socket.on('reconnect', () => {
    log('you have been reconnected');
    if (username && avatar) {
      socket.emit('add user', {
        username: username,
        avatar: avatar
      });
    }
  });

  socket.on('reconnect_error', () => {
    log('attempt to reconnect has failed');
  });

  socket.on('duplicate user', (msg) => {
    $loginPage.fadeIn();
    $chatPage.hide();
    $('.usernameInput').val("");
    username = undefined;
    alert(msg);
  });
});