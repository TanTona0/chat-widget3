// Enhanced Chat Widget Script - Final Fixed Version
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #6366f1);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #8b5cf6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            display: none;
            width: 420px;
            height: 650px;
            background: var(--chat--color-background);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            font-family: inherit;
            animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 30px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px 60px 16px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            border-radius: 24px 24px 0 0;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-size: 24px;
            opacity: 0.9;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            backdrop-filter: blur(10px);
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) rotate(90deg);
        }

        .n8n-chat-widget .brand-header img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            object-fit: cover;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px;
            flex-shrink: 0;
        }

        .n8n-chat-widget .brand-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .n8n-chat-widget .brand-info .brand-name {
            font-size: 18px;
            font-weight: 600;
            color: white;
            line-height: 1.2;
        }

        .n8n-chat-widget .brand-info .brand-status {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .n8n-chat-widget .brand-info .brand-status::before {
            content: '';
            width: 6px;
            height: 6px;
            background: #4ade80;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: #f9fafb;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
        }

        .n8n-chat-widget .message-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 8px;
            animation: messagePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes messagePop {
            from {
                opacity: 0;
                transform: translateY(10px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .n8n-chat-widget .message-wrapper.user {
            flex-direction: row-reverse;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 75%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
        }

        .n8n-chat-widget .chat-message ul,
        .n8n-chat-widget .chat-message ol {
            margin: 8px 0;
            padding-right: 20px;
            padding-left: 0;
        }

        .n8n-chat-widget .chat-message li {
            margin: 4px 0;
            line-height: 1.6;
        }

        .n8n-chat-widget .chat-message p {
            margin: 8px 0;
        }

        .n8n-chat-widget .chat-message p:first-child {
            margin-top: 0;
        }

        .n8n-chat-widget .chat-message p:last-child {
            margin-bottom: 0;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border-bottom-right-radius: 4px;
            box-shadow: 0 2px 8px rgba(142, 176, 39, 0.3);
        }

        .n8n-chat-widget .chat-message.bot {
            background: #f3f4f6;
            color: var(--chat--color-font);
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: #f3f4f6;
            border-radius: 18px;
            border-bottom-left-radius: 4px;
            width: fit-content;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #9ca3af;
            border-radius: 50%;
            animation: typing 1.4s ease-in-out infinite;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.7;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px 20px;
            background: var(--chat--color-background);
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 12px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px 16px;
            border: 1.5px solid #e5e7eb;
            border-radius: 20px;
            background: #f9fafb;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            max-height: 120px;
            min-height: 44px;
            transition: all 0.2s ease;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: var(--chat--color-background);
            box-shadow: 0 0 0 3px rgba(142, 176, 39, 0.1);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #9ca3af;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(142, 176, 39, 0.25);
        }

        .n8n-chat-widget .chat-input button:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(142, 176, 39, 0.35);
        }

        .n8n-chat-widget .chat-input button:active:not(:disabled) {
            transform: scale(0.95);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(142, 176, 39, 0.4);
            z-index: 999;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 32px rgba(142, 176, 39, 0.5);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 30px;
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 12px;
            text-align: center;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.7;
            transition: opacity 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        .n8n-chat-widget .error-message {
            background: #fef2f2;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 18px;
            border-bottom-left-radius: 4px;
            font-size: 14px;
            max-width: 75%;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
    `;

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2021/09/Olive-oil-logo-design-on-transparent-background-PNG.png',
            name: 'Oliye',
            welcomeText: 'مرحبًا 👋، كيف يمكنني مساعدتك؟',
            statusText: 'متصل الآن',
            poweredBy: { text: 'Powered by TanT.AI', link: 'https://tant.manus.space/' }
        },
        style: { primaryColor: '#5f720f', secondaryColor: '#5f720f', position: 'right', backgroundColor: '#ffffff', fontColor: '#333333' }
    };

    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let isWaitingForResponse = false;

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const chatHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <div class="brand-info">
                <div class="brand-name">${config.branding.name}</div>
                <div class="brand-status">${config.branding.statusText || 'Online'}</div>
            </div>
            <button class="close-button">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="اكتب رسالتك هنا..." rows="1"></textarea>
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = chatHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const closeBtn = chatContainer.querySelector('.close-button');

    function generateUUID() {
        return crypto.randomUUID();
    }

    function addMessage(text, isUser = false) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = `message-wrapper ${isUser ? 'user' : 'bot'}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        if (!isUser) {
            let formattedText = text.replace(/\n\*/g, '\n•').replace(/\n-/g, '\n•').trim();
            const paragraphs = formattedText.split('\n\n');
            
            paragraphs.forEach((para, index) => {
                if (para.includes('•')) {
                    const items = para.split('\n').filter(item => item.trim());
                    const ul = document.createElement('ul');
                    ul.style.margin = '8px 0';
                    ul.style.paddingRight = '20px';
                    ul.style.paddingLeft = '0';
                    
                    items.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item.replace(/^[•\-\*]\s*/, '').trim();
                        li.style.margin = '4px 0';
                        ul.appendChild(li);
                    });
                    
                    messageDiv.appendChild(ul);
                } else {
                    const p = document.createElement('p');
                    p.textContent = para;
                    p.style.margin = index === 0 ? '0 0 8px 0' : '8px 0';
                    messageDiv.appendChild(p);
                }
            });
        } else {
            messageDiv.textContent = text;
        }
        
        messageWrapper.appendChild(messageDiv);
        messagesContainer.appendChild(messageWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addErrorMessage(text) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper bot';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = text;
        
        messageWrapper.appendChild(errorDiv);
        messagesContainer.appendChild(messageWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'message-wrapper bot';
        typingWrapper.id = 'typing-indicator';
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        
        typingWrapper.appendChild(typingDiv);
        messagesContainer.appendChild(typingWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        addMessage(config.branding.welcomeText, false);
    }

    async function sendMessage(message) {
        if (isWaitingForResponse) return;
        
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: { userId: "" }
        };

        addMessage(message, true);
        textarea.value = '';
        adjustTextareaHeight();
        
        isWaitingForResponse = true;
        sendBtn.disabled = true;
        showTypingIndicator();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });
            
            hideTypingIndicator();
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            let botResponse = '';
            
            if (typeof data === 'string') {
                try {
                    const parsed = JSON.parse(data);
                    botResponse = parsed.output || parsed.response || parsed.text || parsed.message || data;
                } catch {
                    botResponse = data;
                }
            }
            else if (data.output) botResponse = data.output;
            else if (data.response) botResponse = data.response;
            else if (data.text) botResponse = data.text;
            else if (data.message) botResponse = data.message;
            else if (Array.isArray(data) && data.length > 0) {
                const firstItem = data[0];
                botResponse = firstItem.output || firstItem.response || firstItem.text || firstItem.message || JSON.stringify(firstItem);
            }
            else if (data.data) {
                botResponse = data.data.output || data.data.response || data.data.text || data.data.message || JSON.stringify(data.data);
            }
            else if (data.chatinput && data.sessionid && Object.keys(data).length === 2) {
                botResponse = 'عذراً، لم أتلقَ رداً من الخادم. يرجى المحاولة مرة أخرى.';
            }
            else {
                const allValues = Object.values(data);
                const textValue = allValues.find(val => typeof val === 'string' && val.length > 10 && !val.includes('sessionid'));
                botResponse = textValue || 'عذراً، لم أتمكن من فهم الرد. يرجى المحاولة مرة أخرى.';
            }
            
            addMessage(botResponse, false);
            
        } catch (error) {
            hideTypingIndicator();
            console.error('Error:', error);
            addErrorMessage('عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.');
        } finally {
            isWaitingForResponse = false;
            sendBtn.disabled = false;
        }
    }

    function adjustTextareaHeight() {
        textarea.style.height = '44px';
        const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 120);
        textarea.style.height = newHeight + 'px';
    }

    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open') && messagesContainer.children.length === 0) {
            startNewConversation();
        }
        if (chatContainer.classList.contains('open')) {
            textarea.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('open');
    });

    sendBtn.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message && !isWaitingForResponse) {
            sendMessage(message);
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message && !isWaitingForResponse) {
                sendMessage(message);
            }
        }
    });

    textarea.addEventListener('input', adjustTextareaHeight);
})();
