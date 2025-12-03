// Enhanced Chat Widget Script - Mobile Optimized
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
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            display: none;
            width: min(420px, calc(100vw - 40px));
            height: min(650px, calc(100vh - 40px));
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(99, 102, 241, 0.25);
            border: 1px solid rgba(99, 102, 241, 0.1);
            overflow: hidden;
            font-family: inherit;
            animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                bottom: 0;
                right: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                border-radius: 0;
                max-height: 100vh;
            }
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
            left: 20px;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container.position-left {
                left: 0;
            }
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            border-radius: 24px 24px 0 0;
            flex-shrink: 0;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .brand-header {
                padding: 16px;
                border-radius: 0;
                padding-top: max(16px, env(safe-area-inset-top));
            }
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
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            font-size: 24px;
            opacity: 0.9;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            backdrop-filter: blur(10px);
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .close-button:active {
            opacity: 1;
            background: rgba(255, 255, 255, 0.35);
            transform: translateY(-50%) scale(0.95);
        }

        @media (hover: hover) {
            .n8n-chat-widget .close-button:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-50%) rotate(90deg);
            }
        }

        .n8n-chat-widget .brand-header img {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            object-fit: cover;
            flex-shrink: 0;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .brand-header img {
                width: 40px;
                height: 40px;
            }
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;
            min-width: 0;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 600;
            color: white;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .brand-header span {
                font-size: 16px;
            }
        }

        .n8n-chat-widget .brand-status {
            font-size: 11px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.85);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .n8n-chat-widget .brand-status::before {
            content: '';
            width: 6px;
            height: 6px;
            background: #4ade80;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 2s ease-in-out infinite;
            flex-shrink: 0;
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.6;
                transform: scale(0.95);
            }
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: calc(100% - 84px);
            flex: 1;
            min-height: 0;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-interface {
                height: calc(100% - 72px);
            }
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
            -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-messages {
                padding: 16px;
                gap: 10px;
            }
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.2);
            border-radius: 3px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.4);
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 85%;
            word-wrap: break-word;
            word-break: break-word;
            font-size: 14px;
            line-height: 1.5;
            animation: messagePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-message {
                max-width: 90%;
                padding: 10px 14px;
                font-size: 15px;
            }
        }

        @keyframes messagePop {
            from {
                opacity: 0;
                transform: scale(0.85) translateY(10px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: #f3f4f6;
            border: 1px solid rgba(99, 102, 241, 0.1);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-message.bot a {
            color: var(--chat--color-primary);
            text-decoration: underline;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 12px 16px;
            border-radius: 18px;
            background: #f3f4f6;
            border: 1px solid rgba(99, 102, 241, 0.1);
            align-self: flex-start;
            display: flex;
            gap: 4px;
            align-items: center;
            max-width: 60px;
        }

        .n8n-chat-widget .typing-indicator span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            opacity: 0.6;
            animation: typingBounce 1.4s infinite;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typingBounce {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.6;
            }
            30% {
                transform: translateY(-8px);
                opacity: 1;
            }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(99, 102, 241, 0.08);
            display: flex;
            gap: 10px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-input {
                padding: 12px;
                padding-bottom: max(12px, env(safe-area-inset-bottom));
                gap: 8px;
            }
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px 16px;
            border: 1.5px solid rgba(99, 102, 241, 0.15);
            border-radius: 20px;
            background: #f9fafb;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            max-height: 120px;
            min-height: 42px;
            transition: all 0.2s;
            -webkit-appearance: none;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-input textarea {
                font-size: 16px;
                padding: 10px 14px;
                max-height: 100px;
            }
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: var(--chat--color-background);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.4;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 42px;
            height: 42px;
            min-width: 42px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-input button:active:not(:disabled) {
            transform: scale(0.95);
        }

        @media (hover: hover) {
            .n8n-chat-widget .chat-input button:hover:not(:disabled) {
                transform: scale(1.08);
                box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
            }
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.35);
            z-index: 9998;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 3s ease-in-out infinite;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-toggle {
                width: 60px;
                height: 60px;
                bottom: 16px;
                right: 16px;
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-6px);
            }
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(0.95);
        }

        @media (hover: hover) {
            .n8n-chat-widget .chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
                animation: none;
            }
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-toggle.position-left {
                left: 16px;
            }
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 26px;
            height: 26px;
            fill: currentColor;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-toggle svg {
                width: 24px;
                height: 24px;
            }
        }

        .n8n-chat-widget .chat-footer {
            padding: 10px;
            text-align: center;
            background: #f9fafb;
            border-top: 1px solid rgba(99, 102, 241, 0.08);
            flex-shrink: 0;
            border-radius: 0 0 24px 24px;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-footer {
                padding: 8px;
                border-radius: 0;
                padding-bottom: max(8px, calc(env(safe-area-inset-bottom) / 2));
            }
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 11px;
            opacity: 0.7;
            transition: opacity 0.2s;
            font-family: inherit;
            font-weight: 500;
            -webkit-tap-highlight-color: transparent;
        }

        .n8n-chat-widget .chat-footer a:active {
            opacity: 1;
        }

        @media (hover: hover) {
            .n8n-chat-widget .chat-footer a:hover {
                opacity: 1;
            }
        }

        /* Smooth scrolling */
        .n8n-chat-widget * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    `;

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2021/09/Olive-oil-logo-design-on-transparent-background-PNG.png',
            name: 'Oliye',
            welcomeText: 'مرحبًا 👋، كيف يمكنني مساعدتك؟',
            responseTimeText: 'We typically reply within minutes',
            poweredBy: {
                text: 'Powered by TanT.AI',
                link: 'https://tant.manus.space'
            }
        },
        style: {
            primaryColor: '#5f720f',
            secondaryColor: '#5f720f',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let isProcessing = false;

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
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
                <span>${config.branding.name}</span>
                <div class="brand-status">Online</div>
            </div>
            <button class="close-button" aria-label="Close chat">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages" role="log" aria-live="polite"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message..." rows="1" aria-label="Message input"></textarea>
                <button type="submit" aria-label="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank" rel="noopener noreferrer">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = chatHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.setAttribute('aria-label', 'Open chat');
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

    // Auto-resize textarea
    function autoResizeTextarea() {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    textarea.addEventListener('input', autoResizeTextarea);

    function generateUUID() {
        return crypto.randomUUID();
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        typingDiv.setAttribute('data-typing', 'true');
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    }

    function removeTypingIndicator() {
        const typingDiv = messagesContainer.querySelector('[data-typing="true"]');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.textContent = config.branding.welcomeText;
        messagesContainer.appendChild(botMessageDiv);
        scrollToBottom();
    }

    function formatBotMessage(text) {
        return text
            .replace(/\\n/g, '\n')
            .split('\n')
            .map(line => {
                line = line.trim();
                if (!line) return '';
                
                // Handle bullet points
                if (line.startsWith('*') || line.startsWith('•') || line.startsWith('-')) {
                    return `<span style="display: block; padding-left: 12px; margin: 6px 0; text-indent: -12px;">• ${line.substring(1).trim()}</span>`;
                }
                
                // Handle numbered lists
                const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
                if (numberedMatch) {
                    return `<span style="display: block; padding-left: 16px; margin: 6px 0; text-indent: -16px;">${numberedMatch[1]}. ${numberedMatch[2]}</span>`;
                }
                
                return `<span style="display: block; margin: 6px 0;">${line}</span>`;
            })
            .filter(line => line)
            .join('');
    }

    async function sendMessage(message) {
        if (isProcessing || !message) return;
        
        isProcessing = true;
        sendBtn.disabled = true;

        const messageData = {
            chatInput: message,
            sessionId: currentSessionId
        };

        console.log('=== SENDING MESSAGE ===');
        console.log('Webhook URL:', config.webhook.url);
        console.log('Session ID:', currentSessionId);
        console.log('Message:', message);

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        scrollToBottom();
        
        textarea.value = '';
        textarea.style.height = 'auto';

        const typingIndicator = showTypingIndicator();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            console.log('Response Status:', response.status);
            
            const responseText = await response.text();
            console.log('Raw Response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { output: responseText };
            }
            
            removeTypingIndicator();
            
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
            
            console
