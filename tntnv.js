// TanT AI Chat Widget - Fixed Version
// Version: 1.0.3
(function() {
    'use strict';

    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #2563EB);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #3B82F6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        * {
            box-sizing: border-box;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 90px;
            right: 20px;
            z-index: 999999;
            display: none;
            width: 380px;
            height: 600px;
            max-height: calc(100vh - 120px);
            background: var(--chat--color-background);
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.15);
            overflow: hidden;
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-shrink: 0;
            position: relative;
        }

        .n8n-chat-widget .brand-left {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
        }

        .n8n-chat-widget .brand-header img {
            width: 42px;
            height: 42px;
            border-radius: 10px;
            object-fit: cover;
            flex-shrink: 0;
            background: white;
            border: 2px solid rgba(255,255,255,0.3);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
        }

        .n8n-chat-widget .brand-name {
            font-size: 16px;
            font-weight: 600;
            color: white;
            line-height: 1.2;
            margin: 0;
        }

        .n8n-chat-widget .brand-status {
            font-size: 12px;
            font-weight: 500;
            color: rgba(255,255,255,0.95);
            display: flex;
            align-items: center;
            gap: 6px;
            line-height: 1;
        }

        .n8n-chat-widget .status-dot {
            width: 6px;
            height: 6px;
            background: #4ade80;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .n8n-chat-widget .close-button {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            line-height: 1;
            transition: all 0.2s;
            flex-shrink: 0;
            padding: 0;
        }

        .n8n-chat-widget .close-button:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 0;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 4px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-message {
            padding: 10px 14px;
            border-radius: 14px;
            max-width: 75%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            align-self: flex-end;
            border-radius: 14px 14px 4px 14px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            color: #333;
            align-self: flex-start;
            border: 1px solid #e5e7eb;
            border-radius: 14px 14px 14px 4px;
        }

        .n8n-chat-widget .chat-message[dir="rtl"] {
            text-align: right;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 10px 14px;
            border-radius: 14px 14px 14px 4px;
            background: white;
            border: 1px solid #e5e7eb;
            align-self: flex-start;
            display: flex;
            gap: 4px;
        }

        .n8n-chat-widget .typing-indicator span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            animation: bounce 1.4s infinite;
            opacity: 0.6;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .n8n-chat-widget .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
        }

        .n8n-chat-widget .chat-input {
            padding: 14px 16px;
            background: white;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 10px;
            align-items: flex-end;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            background: #f9fafb;
            color: #333;
            resize: none;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            max-height: 100px;
            transition: border 0.2s;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: white;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #9ca3af;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            border-radius: 12px;
            width: 42px;
            height: 42px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(37,99,235,0.3);
        }

        .n8n-chat-widget .chat-input button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37,99,235,0.4);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-input button svg {
            width: 18px;
            height: 18px;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(37,99,235,0.4);
            z-index: 999998;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(37,99,235,0.5);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 11px;
            opacity: 0.7;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100vw;
                height: 100vh;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
                max-height: 100vh;
            }

            .n8n-chat-widget .brand-header {
                padding: 16px 18px;
                padding-top: max(16px, env(safe-area-inset-top));
            }

            .n8n-chat-widget .chat-toggle {
                width: 54px;
                height: 54px;
                bottom: 16px;
                right: 16px;
            }

            .n8n-chat-widget .chat-message {
                max-width: 80%;
            }

            .n8n-chat-widget .chat-input {
                padding-bottom: max(14px, env(safe-area-inset-bottom));
            }

            .n8n-chat-widget .chat-input textarea {
                font-size: 16px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: '',
            name: 'Chat',
            welcomeText: 'Hello! How can I help you?',
            poweredBy: { text: 'Powered by TanT.AI', link: '#' }
        },
        style: {
            primaryColor: '#2563EB',
            secondaryColor: '#3B82F6',
            position: 'right'
        }
    };

    const config = window.ChatWidgetConfig ? {
        webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
        branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
        style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
    } : defaultConfig;

    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    
    chatContainer.innerHTML = `
        <div class="brand-header">
            <div class="brand-left">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <div class="brand-info">
                    <div class="brand-name">${config.branding.name}</div>
                    <div class="brand-status">
                        <span class="status-dot"></span>
                        Online
                    </div>
                </div>
            </div>
            <button class="close-button">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="اكتب رسالتك..." rows="1"></textarea>
                <button type="submit">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'chat-toggle';
    toggleButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const closeBtn = chatContainer.querySelector('.close-button');

    function adjustTextareaHeight() {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }

    textarea.addEventListener('input', adjustTextareaHeight);

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function detectRTL(text) {
        return /[\u0600-\u06FF]/.test(text);
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        if (detectRTL(config.branding.welcomeText)) {
            botMessageDiv.setAttribute('dir', 'rtl');
        }
        botMessageDiv.textContent = config.branding.welcomeText;
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage(message) {
        const messageData = {
            chatInput: message,
            sessionId: currentSessionId
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        if (detectRTL(message)) {
            userMessageDiv.setAttribute('dir', 'rtl');
        }
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        textarea.value = '';
        adjustTextareaHeight();

        sendBtn.disabled = true;
        const typingIndicator = showTypingIndicator();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });
            
            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { output: responseText };
            }
            
            typingIndicator.remove();
            sendBtn.disabled = false;
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            
            let botText = '';
            if (typeof data === 'string') {
                botText = data;
            } else if (Array.isArray(data)) {
                botText = data[0]?.output || data[0]?.message || data[0]?.text || JSON.stringify(data[0]);
            } else {
                botText = data.output || data.message || data.text || JSON.stringify(data);
            }
            
            if (detectRTL(botText)) {
                botMessageDiv.setAttribute('dir', 'rtl');
            }
            
            botText = botText
                .replace(/\\n/g, '\n')
                .split('\n')
                .map(line => line.trim() ? `<div>${line.trim()}</div>` : '')
                .filter(line => line)
                .join('');
            
            botMessageDiv.innerHTML = botText;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            sendBtn.disabled = false;
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.textContent = 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
            errorDiv.setAttribute('dir', 'rtl');
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open') && messagesContainer.children.length === 0) {
            startNewConversation();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('open');
    });

    sendBtn.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message && !sendBtn.disabled) sendMessage(message);
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message && !sendBtn.disabled) sendMessage(message);
        }
    });

    console.log('✅ TanT Widget Loaded');
})();
