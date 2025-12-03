// TanT AI Chat Widget - Enhanced Version
// Version: 1.0.2
(function() {
    'use strict';

    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #2563EB);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #3B82F6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            --chat--safe-area-inset-bottom: env(safe-area-inset-bottom);
            --chat--safe-area-inset-top: env(safe-area-inset-top);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .n8n-chat-widget * {
            box-sizing: border-box;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 999999;
            display: none;
            width: 400px;
            height: 650px;
            max-height: calc(100vh - 130px);
            background: var(--chat--color-background);
            border-radius: 20px;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.12), 0 24px 60px rgba(0,0,0,0.15);
            overflow: hidden;
            animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
            will-change: transform, opacity;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
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
            padding: 18px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            flex-shrink: 0;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-size: 22px;
            opacity: 0.95;
            border-radius: 8px;
            min-width: 36px;
            min-height: 36px;
            backdrop-filter: blur(10px);
            font-weight: 300;
            -webkit-tap-highlight-color: transparent;
        }

        .n8n-chat-widget .close-button:hover,
        .n8n-chat-widget .close-button:focus {
            opacity: 1;
            background: rgba(255,255,255,0.3);
            transform: translateY(-50%) scale(1.05);
        }

        .n8n-chat-widget .brand-header img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            object-fit: cover;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            border: 2px solid rgba(255,255,255,0.25);
            flex-shrink: 0;
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;
            min-width: 0;
            margin-right: 40px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 16px;
            font-weight: 600;
            color: white;
            letter-spacing: -0.2px;
            line-height: 1.2;
        }

        .n8n-chat-widget .brand-status {
            font-size: 12px;
            font-weight: 500;
            color: rgba(255,255,255,0.9);
            display: flex;
            align-items: center;
            gap: 6px;
            line-height: 1.2;
        }

        .n8n-chat-widget .brand-status::before {
            content: '';
            width: 6px;
            height: 6px;
            background: #4ade80;
            border-radius: 50%;
            display: inline-block;
            animation: statusPulse 2s ease-in-out infinite;
            box-shadow: 0 0 6px rgba(74,222,128,0.8);
        }

        @keyframes statusPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.9); }
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
            overflow-x: hidden;
            padding: 18px 16px;
            background: linear-gradient(180deg, #f8fafc 0%, #ffffff 50%);
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 4px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.15);
            border-radius: 10px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(0,0,0,0.25);
        }

        .n8n-chat-widget .chat-message {
            padding: 11px 15px;
            border-radius: 16px;
            max-width: 78%;
            word-wrap: break-word;
            word-break: break-word;
            font-size: 14px;
            line-height: 1.5;
            animation: messagePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
            position: relative;
        }

        @keyframes messagePop {
            from { opacity: 0; transform: scale(0.92) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 2px 8px rgba(37,99,235,0.3);
            border-radius: 16px 16px 4px 16px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(0,0,0,0.09);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 1px 6px rgba(0,0,0,0.08);
            border-radius: 16px 16px 16px 4px;
        }

        .n8n-chat-widget .chat-message[dir="rtl"] {
            text-align: right;
        }

        .n8n-chat-widget .chat-message.user[dir="rtl"] {
            border-radius: 16px 16px 16px 4px;
        }

        .n8n-chat-widget .chat-message.bot[dir="rtl"] {
            border-radius: 16px 16px 4px 16px;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 11px 15px;
            border-radius: 16px 16px 16px 4px;
            background: white;
            border: 1px solid rgba(0,0,0,0.09);
            box-shadow: 0 1px 6px rgba(0,0,0,0.08);
            align-self: flex-start;
            display: flex;
            gap: 4px;
            align-items: center;
            animation: messagePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            animation: typingBounce 1.3s infinite;
            opacity: 0.6;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) { animation-delay: 0.15s; }
        .n8n-chat-widget .typing-indicator span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
            30% { transform: translateY(-6px); opacity: 1; }
        }

        .n8n-chat-widget .chat-input {
            padding: 14px 16px;
            padding-bottom: max(14px, calc(var(--chat--safe-area-inset-bottom) + 14px));
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0,0,0,0.08);
            display: flex;
            gap: 10px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 11px 14px;
            border: 1.5px solid rgba(0,0,0,0.12);
            border-radius: 14px;
            background: #f8fafc;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            max-height: 100px;
            transition: all 0.2s ease;
            line-height: 1.5;
            -webkit-appearance: none;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: var(--chat--color-background);
            box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #94a3b8;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            min-width: 44px;
            min-height: 44px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 3px 10px rgba(37,99,235,0.3);
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .chat-input button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37,99,235,0.4);
        }

        .n8n-chat-widget .chat-input button:active:not(:disabled) {
            transform: translateY(0);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-input button svg {
            width: 19px;
            height: 19px;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            bottom: max(24px, calc(var(--chat--safe-area-inset-bottom) + 10px));
            right: 24px;
            right: max(24px, calc(var(--chat--safe-area-inset-right) + 10px));
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(37,99,235,0.35);
            z-index: 999998;
            transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 3s ease-in-out infinite;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        .n8n-chat-widget .chat-toggle:hover,
        .n8n-chat-widget .chat-toggle:focus {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 10px 28px rgba(37,99,235,0.45);
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(1.02);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
            left: max(24px, calc(var(--chat--safe-area-inset-left) + 10px));
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 9px;
            text-align: center;
            background: #f8fafc;
            border-top: 1px solid rgba(0,0,0,0.08);
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 10.5px;
            opacity: 0.65;
            transition: opacity 0.2s;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 0.95;
        }

        /* Mobile Optimizations */
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100vw;
                height: 100vh;
                height: 100dvh;
                max-height: 100vh;
                max-height: 100dvh;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
            }
            
            .n8n-chat-widget .brand-header {
                padding: 16px 18px;
                padding-top: max(16px, calc(var(--chat--safe-area-inset-top) + 16px));
            }

            .n8n-chat-widget .brand-header img {
                width: 36px;
                height: 36px;
            }

            .n8n-chat-widget .brand-header span {
                font-size: 15px;
            }

            .n8n-chat-widget .brand-status {
                font-size: 11px;
            }
            
            .n8n-chat-widget .chat-toggle {
                width: 56px;
                height: 56px;
                bottom: 20px;
                bottom: max(20px, calc(var(--chat--safe-area-inset-bottom) + 10px));
                right: 20px;
                right: max(20px, calc(var(--chat--safe-area-inset-right) + 10px));
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 20px;
                left: max(20px, calc(var(--chat--safe-area-inset-left) + 10px));
            }

            .n8n-chat-widget .chat-toggle svg {
                width: 22px;
                height: 22px;
            }

            .n8n-chat-widget .chat-message {
                max-width: 82%;
                font-size: 13.5px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 16px 14px;
            }

            .n8n-chat-widget .chat-input {
                padding: 12px 14px;
                padding-bottom: max(12px, calc(var(--chat--safe-area-inset-bottom) + 12px));
            }

            .n8n-chat-widget .chat-input textarea {
                font-size: 16px;
            }
        }

        @media (max-width: 360px) {
            .n8n-chat-widget .chat-message {
                font-size: 13px;
                max-width: 85%;
            }
        }

        /* Landscape Mobile */
        @media (max-height: 500px) and (orientation: landscape) {
            .n8n-chat-widget .chat-container {
                height: 100vh;
            }
            
            .n8n-chat-widget .brand-header {
                padding: 10px 16px;
            }

            .n8n-chat-widget .brand-header img {
                width: 32px;
                height: 32px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 12px;
            }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            .n8n-chat-widget .chat-container,
            .n8n-chat-widget .chat-message,
            .n8n-chat-widget .typing-indicator,
            .n8n-chat-widget .chat-toggle {
                animation: none !important;
            }
            
            .n8n-chat-widget .chat-toggle:hover,
            .n8n-chat-widget .close-button:hover,
            .n8n-chat-widget .chat-input button:hover {
                transform: none !important;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const defaultConfig = {
        webhook: { url: '', route: '', timeout: 30000 },
        branding: {
            logo: '',
            name: 'Chat',
            welcomeText: 'Hello! How can I help you?',
            responseTimeText: 'We typically reply within minutes',
            poweredBy: { text: 'Powered by TanT.AI', link: 'https://tant.manus.space' }
        },
        style: {
            primaryColor: '#2563EB',
            secondaryColor: '#3B82F6',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    const config = window.ChatWidgetConfig ? {
        webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
        branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
        style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
    } : defaultConfig;

    if (window.N8NChatWidgetInitialized) {
        console.warn('TanT Chat Widget already initialized');
        return;
    }
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    chatContainer.innerHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <div class="brand-info">
                <span>${config.branding.name}</span>
                <div class="brand-status">Online</div>
            </div>
            <button class="close-button">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="اكتب رسالتك..." rows="1"></textarea>
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
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>`;
    
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
        const rtlChars = /[\u0600-\u06FF]/;
        return rtlChars.test(text);
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
                .map(line => {
                    if (line.trim().startsWith('*')) {
                        return `<span style="display: block; padding-left: 8px; margin: 4px 0;">• ${line.trim().substring(1).trim()}</span>`;
                    }
                    return line.trim() ? `<span style="display: block; margin: 4px 0;">${line.trim()}</span>` : '';
                })
                .filter(line => line)
                .join('');
            
            botMessageDiv.innerHTML = botText;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('TanT Chat Error:', error);
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

    console.log('✅ TanT Chat Widget v1.0.2 Loaded');
})();
