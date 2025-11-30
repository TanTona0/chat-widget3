// Enhanced Chat Widget Script - Improved Version
(function() {
    'use strict';
    
    var styles = '.n8n-chat-widget{--chat--color-primary:var(--n8n-chat-primary-color,#8eb027);--chat--color-secondary:var(--n8n-chat-secondary-color,#6a8520);--chat--color-background:var(--n8n-chat-background-color,#fff);--chat--color-font:var(--n8n-chat-font-color,#2d3748);font-family:Geist Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.n8n-chat-widget .chat-container{position:fixed;bottom:24px;right:24px;z-index:9999;display:none;width:400px;height:600px;background:var(--chat--color-background);border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.2),0 0 0 1px rgba(0,0,0,.08);overflow:hidden;font-family:inherit;animation:slideUp .3s cubic-bezier(.34,1.56,.64,1)}@keyframes slideUp{from{opacity:0;transform:translateY(20px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}.n8n-chat-widget .chat-container.position-left{right:auto;left:24px}.n8n-chat-widget .chat-container.open{display:flex;flex-direction:column}.n8n-chat-widget .brand-header{padding:18px 20px;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,var(--chat--color-primary) 0%,var(--chat--color-secondary) 100%);position:relative;border-radius:20px 20px 0 0}.n8n-chat-widget .close-button{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;transition:all .2s ease;font-size:22px;opacity:.85;border-radius:50%;width:30px;height:30px;backdrop-filter:blur(10px);line-height:1}.n8n-chat-widget .close-button:hover{opacity:1;background:rgba(255,255,255,.25);transform:translateY(-50%) rotate(90deg)}.n8n-chat-widget .brand-header img{width:42px;height:42px;border-radius:12px;object-fit:cover;background:rgba(255,255,255,.15);padding:6px;flex-shrink:0;border:2px solid rgba(255,255,255,.2)}.n8n-chat-widget .brand-info{flex:1;display:flex;flex-direction:column;gap:3px}.n8n-chat-widget .brand-info .brand-name{font-size:17px;font-weight:700;color:#fff;line-height:1.2;letter-spacing:-.01em}.n8n-chat-widget .brand-info .brand-status{font-size:11px;color:rgba(255,255,255,.85);display:flex;align-items:center;gap:6px;font-weight:500}.n8n-chat-widget .brand-info .brand-status::before{content:"";width:7px;height:7px;background:#4ade80;border-radius:50%;display:inline-block;animation:pulse 2s ease-in-out infinite;box-shadow:0 0 0 2px rgba(74,222,128,.3)}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}.n8n-chat-widget .chat-interface{display:flex;flex-direction:column;height:100%;background:#f8fafc}.n8n-chat-widget .chat-messages{flex:1;overflow-y:auto;padding:20px 16px;background:var(--chat--color-background);display:flex;flex-direction:column;gap:14px}.n8n-chat-widget .chat-messages::-webkit-scrollbar{width:5px}.n8n-chat-widget .chat-messages::-webkit-scrollbar-track{background:transparent}.n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:10px}.n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.18)}.n8n-chat-widget .message-wrapper{display:flex;align-items:flex-end;gap:6px;animation:messagePop .25s cubic-bezier(.34,1.56,.64,1)}@keyframes messagePop{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}.n8n-chat-widget .message-wrapper.user{flex-direction:row-reverse}.n8n-chat-widget .chat-message{padding:11px 15px;border-radius:16px;max-width:80%;word-wrap:break-word;font-size:14px;line-height:1.55;white-space:pre-wrap}.n8n-chat-widget .chat-message ul,.n8n-chat-widget .chat-message ol{margin:8px 0;padding-right:18px;padding-left:0}.n8n-chat-widget .chat-message li{margin:3px 0;line-height:1.55}.n8n-chat-widget .chat-message p{margin:6px 0}.n8n-chat-widget .chat-message p:first-child{margin-top:0}.n8n-chat-widget .chat-message p:last-child{margin-bottom:0}.n8n-chat-widget .chat-message.user{background:linear-gradient(135deg,var(--chat--color-primary) 0%,var(--chat--color-secondary) 100%);color:#fff;border-bottom-right-radius:5px;box-shadow:0 2px 10px rgba(142,176,39,.35);font-weight:500}.n8n-chat-widget .chat-message.bot{background:#f1f5f9;color:var(--chat--color-font);border-bottom-left-radius:5px;box-shadow:0 1px 3px rgba(0,0,0,.06)}.n8n-chat-widget .typing-indicator{display:flex;gap:5px;padding:11px 15px;background:#f1f5f9;border-radius:16px;border-bottom-left-radius:5px;width:fit-content;box-shadow:0 1px 3px rgba(0,0,0,.06)}.n8n-chat-widget .typing-indicator span{width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typing 1.4s ease-in-out infinite}.n8n-chat-widget .typing-indicator span:nth-child(2){animation-delay:.2s}.n8n-chat-widget .typing-indicator span:nth-child(3){animation-delay:.4s}@keyframes typing{0%,60%,100%{transform:translateY(0);opacity:.6}30%{transform:translateY(-8px);opacity:1}}.n8n-chat-widget .chat-input{padding:14px 16px;background:var(--chat--color-background);border-top:1px solid #e2e8f0;display:flex;gap:10px;align-items:flex-end;flex-shrink:0}.n8n-chat-widget .chat-input textarea{flex:1;padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:18px;background:#f8fafc;color:var(--chat--color-font);resize:none;font-family:inherit;font-size:14px;max-height:100px;min-height:42px;transition:all .2s ease;line-height:1.5}.n8n-chat-widget .chat-input textarea:focus{outline:none;border-color:var(--chat--color-primary);background:var(--chat--color-background);box-shadow:0 0 0 3px rgba(142,176,39,.12)}.n8n-chat-widget .chat-input textarea::placeholder{color:#94a3b8}.n8n-chat-widget .chat-input button{background:linear-gradient(135deg,var(--chat--color-primary) 0%,var(--chat--color-secondary) 100%);color:#fff;border:none;border-radius:50%;width:42px;height:42px;cursor:pointer;transition:all .2s ease;font-family:inherit;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 3px 10px rgba(142,176,39,.3)}.n8n-chat-widget .chat-input button:hover:not(:disabled){transform:scale(1.06);box-shadow:0 4px 14px rgba(142,176,39,.4)}.n8n-chat-widget .chat-input button:active:not(:disabled){transform:scale(.96)}.n8n-chat-widget .chat-input button:disabled{opacity:.5;cursor:not-allowed}.n8n-chat-widget .chat-toggle{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--chat--color-primary) 0%,var(--chat--color-secondary) 100%);color:#fff;border:none;cursor:pointer;box-shadow:0 6px 20px rgba(142,176,39,.45);z-index:9998;transition:all .3s cubic-bezier(.34,1.56,.64,1);display:flex;align-items:center;justify-content:center}.n8n-chat-widget .chat-toggle:hover{transform:scale(1.08);box-shadow:0 8px 28px rgba(142,176,39,.55)}.n8n-chat-widget .chat-toggle.position-left{right:auto;left:24px}.n8n-chat-widget .chat-toggle svg{width:26px;height:26px;fill:currentColor}.n8n-chat-widget .chat-footer{padding:10px;text-align:center;background:#f8fafc;border-top:1px solid #e2e8f0;flex-shrink:0}.n8n-chat-widget .chat-footer a{color:var(--chat--color-primary);text-decoration:none;font-size:11px;opacity:.65;transition:opacity .2s;font-family:inherit;font-weight:600}.n8n-chat-widget .chat-footer a:hover{opacity:1}.n8n-chat-widget .error-message{background:#fef2f2;color:#dc2626;padding:11px 15px;border-radius:16px;border-bottom-left-radius:5px;font-size:13px;max-width:80%;box-shadow:0 1px 3px rgba(220,38,38,.1);border-left:3px solid #ef4444}';

    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    var styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    var defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2021/09/Olive-oil-logo-design-on-transparent-background-PNG.png',
            name: 'Oliye',
            welcomeText: 'مرحبًا 👋، كيف يمكنني مساعدتك؟',
            responseTimeText: 'نعد عليك في أقل من دقيقة',
            statusText: 'متصل الآن',
            poweredBy: { text: 'Powered by TanT.AI', link: 'https://tant.manus.space/' }
        },
        style: { 
            primaryColor: '#8eb027', 
            secondaryColor: '#6a8520', 
            position: 'right', 
            backgroundColor: '#ffffff', 
            fontColor: '#2d3748' 
        }
    };

    var config = window.ChatWidgetConfig ? {
        webhook: Object.assign({}, defaultConfig.webhook, window.ChatWidgetConfig.webhook || {}),
        branding: Object.assign({}, defaultConfig.branding, window.ChatWidgetConfig.branding || {}),
        style: Object.assign({}, defaultConfig.style, window.ChatWidgetConfig.style || {})
    } : defaultConfig;

    if (window.N8NChatWidgetInitialized) {
        return;
    }
    window.N8NChatWidgetInitialized = true;

    var currentSessionId = '';
    var isWaitingForResponse = false;

    var widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    var chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container' + (config.style.position === 'left' ? ' position-left' : '');
    
    chatContainer.innerHTML = '<div class="brand-header"><img src="' + config.branding.logo + '" alt="' + config.branding.name + '"><div class="brand-info"><div class="brand-name">' + config.branding.name + '</div><div class="brand-status">' + (config.branding.statusText || 'متصل الآن') + '</div></div><button class="close-button">×</button></div><div class="chat-interface"><div class="chat-messages"></div><div class="chat-input"><textarea placeholder="اكتب رسالتك هنا..." rows="1"></textarea><button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div><div class="chat-footer"><a href="' + config.branding.poweredBy.link + '" target="_blank">' + config.branding.poweredBy.text + '</a></div></div>';
    
    var toggleButton = document.createElement('button');
    toggleButton.className = 'chat-toggle' + (config.style.position === 'left' ? ' position-left' : '');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    var messagesContainer = chatContainer.querySelector('.chat-messages');
    var textarea = chatContainer.querySelector('textarea');
    var sendBtn = chatContainer.querySelector('.chat-input button');
    var closeBtn = chatContainer.querySelector('.close-button');

    function generateUUID() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    }

    function addMessage(text, isUser) {
        var messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper ' + (isUser ? 'user' : 'bot');
        
        var messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ' + (isUser ? 'user' : 'bot');
        
        if (!isUser) {
            var formattedText = text.replace(/\n\*/g, '\n•').replace(/\n-/g, '\n•').trim();
            var paragraphs = formattedText.split('\n\n');
            
            for (var i = 0; i < paragraphs.length; i++) {
                var para = paragraphs[i];
                if (para.indexOf('•') !== -1) {
                    var items = para.split('\n').filter(function(item) { return item.trim(); });
                    var ul = document.createElement('ul');
                    ul.style.margin = '8px 0';
                    ul.style.paddingRight = '18px';
                    ul.style.paddingLeft = '0';
                    
                    for (var j = 0; j < items.length; j++) {
                        var li = document.createElement('li');
                        li.textContent = items[j].replace(/^[•\-\*]\s*/, '').trim();
                        li.style.margin = '3px 0';
                        ul.appendChild(li);
                    }
                    
                    messageDiv.appendChild(ul);
                } else {
                    var p = document.createElement('p');
                    p.textContent = para;
                    p.style.margin = i === 0 ? '0 0 6px 0' : '6px 0';
                    messageDiv.appendChild(p);
                }
            }
        } else {
            messageDiv.textContent = text;
        }
        
        messageWrapper.appendChild(messageDiv);
        messagesContainer.appendChild(messageWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addErrorMessage(text) {
        var messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper bot';
        
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = text;
        
        messageWrapper.appendChild(errorDiv);
        messagesContainer.appendChild(messageWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        var typingWrapper = document.createElement('div');
        typingWrapper.className = 'message-wrapper bot';
        typingWrapper.id = 'typing-indicator';
        
        var typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        
        typingWrapper.appendChild(typingDiv);
        messagesContainer.appendChild(typingWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        var typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        addMessage(config.branding.welcomeText, false);
        if (config.branding.responseTimeText) {
            setTimeout(function() {
                addMessage(config.branding.responseTimeText, false);
            }, 800);
        }
    }

    function sendMessage(message) {
        if (isWaitingForResponse) {
            return;
        }
        
        var messageData = {
            action: 'sendMessage',
            sessionId: currentSessionId,
            route: config.webhook.route || 'general',
            chatInput: message
        };

        addMessage(message, true);
        textarea.value = '';
        adjustTextareaHeight();
        
        isWaitingForResponse = true;
        sendBtn.disabled = true;
        showTypingIndicator();

        console.log('Sending to n8n:', messageData);

        fetch(config.webhook.url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(messageData)
        })
        .then(function(response) {
            console.log('Response status:', response.status);
            hideTypingIndicator();
            
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            
            return response.text();
        })
        .then(function(text) {
            console.log('Raw response:', text);
            
            var botResponse = '';
            
            try {
                var data = JSON.parse(text);
                console.log('Parsed response:', data);
                
                // Try multiple response formats
                if (typeof data === 'string') {
                    botResponse = data;
                } else if (data.output) {
                    botResponse = data.output;
                } else if (data.response) {
                    botResponse = data.response;
                } else if (data.text) {
                    botResponse = data.text;
                } else if (data.message) {
                    botResponse = data.message;
                } else if (data.result) {
                    botResponse = data.result;
                } else if (data.answer) {
                    botResponse = data.answer;
                } else if (Array.isArray(data) && data.length > 0) {
                    var item = data[0];
                    botResponse = item.output || item.response || item.text || item.message || item.result || JSON.stringify(item);
                } else {
                    // Try to find any string value that looks like a response
                    var values = Object.values(data);
                    for (var i = 0; i < values.length; i++) {
                        if (typeof values[i] === 'string' && values[i].length > 5 && 
                            values[i] !== currentSessionId && values[i] !== 'sendMessage') {
                            botResponse = values[i];
                            break;
                        }
                    }
                    
                    if (!botResponse) {
                        console.warn('Unknown response format:', data);
                        botResponse = 'عذراً، تلقيت رداً غير متوقع من الخادم.';
                    }
                }
            } catch(e) {
                console.error('Parse error:', e);
                // If not JSON, treat as plain text
                botResponse = text || 'عذراً، لم أتمكن من فهم الرد.';
            }
            
            if (botResponse) {
                addMessage(botResponse, false);
            } else {
                addErrorMessage('لم أتلق رداً من الخادم.');
            }
        })
        .catch(function(error) {
            hideTypingIndicator();
            console.error('Fetch error:', error);
            addErrorMessage('عذراً، حدث خطأ في الاتصال: ' + error.message);
        })
        .finally(function() {
            isWaitingForResponse = false;
            sendBtn.disabled = false;
        });
    }

    function adjustTextareaHeight() {
        textarea.style.height = '42px';
        var newHeight = Math.min(Math.max(textarea.scrollHeight, 42), 100);
        textarea.style.height = newHeight + 'px';
    }

    toggleButton.addEventListener('click', function() {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open') && messagesContainer.children.length === 0) {
            startNewConversation();
        }
        if (chatContainer.classList.contains('open')) {
            setTimeout(function() {
                textarea.focus();
            }, 300);
        }
    });

    closeBtn.addEventListener('click', function() {
        chatContainer.classList.remove('open');
    });

    sendBtn.addEventListener('click', function() {
        var message = textarea.value.trim();
        if (message && !isWaitingForResponse) {
            sendMessage(message);
        }
    });
    
    textarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            var message = textarea.value.trim();
            if (message && !isWaitingForResponse) {
                sendMessage(message);
            }
        }
    });

    textarea.addEventListener('input', adjustTextareaHeight);
})();
