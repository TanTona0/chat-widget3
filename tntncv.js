// TanT AI Chat Widget - Bubbly Design
// Version: 2.0.0
(function() {
    'use strict';

    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #2563EB);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #3B82F6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
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
            width: 400px;
            height: 620px;
            max-height: calc(100vh - 120px);
            background: var(--chat--color-background);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
            overflow: hidden;
            animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            padding: 20px;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .n8n-chat-widget .brand-header img {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            object-fit: cover;
            background: white;
            padding: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            flex-shrink: 0;
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
        }

        .n8n-chat-widget .brand-name {
            font-size: 17px;
            font-weight: 700;
            color: white;
            line-height: 1.2;
            letter-spacing: -0.3px;
        }

        .n8n-chat-widget .brand-status {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255,255,255,0.95);
            display: flex;
            align-items: center;
            gap: 6px;
            line-height: 1;
        }

        .n8n-chat-widget .status-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }

        .n8n-chat-widget .close-button {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            border: none;
            color: white;
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            line-height: 1;
            transition: all 0.2s ease;
            flex-shrink: 0;
            padding: 0;
            font-weight: 300;
        }

        .n8n-chat-widget .close-button:hover {
            background: rgba(255,255,255,0.3);
            transform: rotate(90deg) scale(1.1);
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
            padding: 20px;
            background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
            display: flex;
            flex-direction: column;
            gap: 14px;
            min-height: 0;
            -webkit-overflow-scrolling: touch;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 5px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, var(--chat--color-primary), var(--chat--color-secondary));
            border-radius: 10px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 20px;
            max-width: 75%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.6;
            animation: messageSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
        }

        @keyframes messageSlide {
            from { opacity: 0; transform: translateY(20px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-radius: 20px 20px 4px 20px;
            box-shadow: 0 4px 12px rgba(37,99,235,0.25);
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            color: #1f2937;
            align-self: flex-start;
            border: 1px solid #e5e7eb;
            border-radius: 20px 20px 20px 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .n8n-chat-widget .chat-message[dir="rtl"] {
            text-align: right;
        }

        .n8n-chat-widget .chat-message.user[dir="rtl"] {
            border-radius: 20px 20px 20px 4px;
        }

        .n8n-chat-widget .chat-message.bot[dir="rtl"] {
            border-radius: 20px 20px 4px 20px;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 12px 16px;
            border-radius: 20px 20px 20px 4px;
            background: white;
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            align-self: flex-start;
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            animation: bounce 1.4s ease-in-out infinite;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .n8n-chat-widget .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .n8n-chat-widget .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
            30% { transform: translateY(-10px); opacity: 1; }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px 20px;
            padding-bottom: 20px;
            background: white;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 10px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 20px;
            background: #f9fafb;
            color: #1f2937;
            resize: none;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            max-height: 120px;
            transition: all 0.2s ease;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: white;
            box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #9ca3af;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            border-radius: 16px;
            width: 48px;
            height: 48px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        }

        .n8n-chat-widget .chat-input button:hover:not(:disabled) {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 6px 20px rgba(37,99,235,0.4);
        }

        .n8n-chat-widget .chat-input button:active:not(:disabled) {
            transform: translateY(-1px) scale(1.02);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(37,99,235,0.4);
            z-index: 999998;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1) translateY(-4px);
            box-shadow: 0 12px 32px rgba(37,99,235,0.5);
            animation: none;
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
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
            font-size: 11px;
            font-weight: 600;
            opacity: 0.7;
            transition: opacity 0.2s;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100vw;
                height: 100vh;
                height: 100dvh;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
                max-height: 100vh;
            }

            .n8n-chat-widget .brand-header {
                padding: 18px;
                padding-top: max(18px, env(safe-area-inset-top, 18px));
            }

            .n8n-chat-widget .brand-header img {
                width: 44px;
                height: 44px;
            }

            .n8n-chat-widget .brand-name {
                font-size: 16px;
            }

            .n8n-chat-widget .brand-status {
                font-size: 12px;
            }

            .n8n-chat-widget .chat-toggle {
                width: 56px;
                height: 56px;
                bottom: 16px;
                right: 16px;
                bottom: max(16px, env(safe-area-inset-bottom, 16px));
                right: max(16px, env(safe-area-inset-right, 16px));
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 16px;
                left: max(16px, env(safe-area-inset-left, 16px));
            }

            .n8n-chat-widget .chat-toggle svg {
                width: 24px;
                height: 24px;
            }

            .n8n-chat-widget .chat-message {
                max-width: 80%;
            }

            .n8n-chat-widget .chat-messages {
                padding: 16px;
            }

            .n8n-chat-widget .chat-input {
                padding: 14px 16px;
                padding-bottom: max(14px, env(safe-area-inset-bottom, 14px));
            }

            .n8n-chat-widget .chat-input textarea {
                font-size: 16px;
            }

            .n8n-chat-widget .chat-input button {
                width: 44px;
                height: 44px;
            }
        }

        @media (max-width: 360px) {
            .n8n-chat-widget .chat-message {
                font-size: 13px;
            }
        }

        /* Landscape mode */
        @media (max-height: 500px) and (orientation: landscape) {
            .n8n-chat-widget .chat-container {
                height: 100vh;
            }
            
            .n8n-chat-widget .brand-header {
                padding: 12px 18px;
            }

            .n8n-chat-widget .brand-header img {
                width: 36px;
                height: 36px;
            }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            .n8n-chat-widget * {
                animation: none !important;
                transition: none !important;
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
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    chatContainer.innerHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <div class="brand-info">
                <div class="brand-name">${config.branding.name}</div>
                <div class="brand-status">
                    <span class="status-dot"></span>
                    Online
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
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
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
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
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
                .map(line => line.trim() ? `<div style="margin: 2px 0;">${line.trim()}</div>` : '')
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

    console.log('✅ TanT Widget v2.0 Loaded');
})();
