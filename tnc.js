// Modern Chat Widget - Enhanced Design
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #2563eb);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #1d4ed8);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            display: none;
            width: 400px;
            height: 650px;
            background: var(--chat--color-background);
            border-radius: 20px;
            box-shadow: 
                0 0 0 1px rgba(0, 0, 0, 0.05),
                0 10px 25px rgba(0, 0, 0, 0.1),
                0 20px 48px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-family: inherit;
            animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                max-height: 100vh;
                max-height: 100dvh;
                border-radius: 0;
                animation: slideUpMobile 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .n8n-chat-widget .chat-container.position-left {
                left: 0;
            }

            .n8n-chat-widget .brand-header {
                padding: 18px 20px;
                padding-top: max(18px, env(safe-area-inset-top));
            }

            .n8n-chat-widget .chat-interface {
                height: calc(100% - 75px);
            }

            .n8n-chat-widget .chat-messages {
                padding: 16px;
                padding-bottom: max(16px, env(safe-area-inset-bottom));
            }

            .n8n-chat-widget .chat-input-wrapper {
                padding: 14px 16px;
                padding-bottom: max(14px, env(safe-area-inset-bottom));
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
            }

            .n8n-chat-widget .chat-toggle.position-left {
                right: auto;
                left: 20px;
            }

            .n8n-chat-widget .brand-header img {
                width: 38px;
                height: 38px;
            }

            .n8n-chat-widget .brand-name {
                font-size: 17px;
            }
        }

        @media (max-width: 480px) {
            .n8n-chat-widget .chat-input textarea {
                font-size: 16px;
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

        @keyframes slideUpMobile {
            from {
                opacity: 0;
                transform: translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 14px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            flex-shrink: 0;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.15);
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            font-size: 24px;
            border-radius: 10px;
            width: 36px;
            height: 36px;
            -webkit-tap-highlight-color: transparent;
            backdrop-filter: blur(10px);
        }

        .n8n-chat-widget .close-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-50%) rotate(90deg);
        }

        .n8n-chat-widget .close-button:active {
            transform: translateY(-50%) scale(0.9);
        }

        .n8n-chat-widget .brand-header img {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            object-fit: cover;
            flex-shrink: 0;
            background: white;
            padding: 2px;
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 3px;
            flex: 1;
            min-width: 0;
        }

        .n8n-chat-widget .brand-name {
            font-size: 18px;
            font-weight: 600;
            color: white;
            line-height: 1.2;
            letter-spacing: -0.01em;
        }

        .n8n-chat-widget .brand-status {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.85);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .n8n-chat-widget .brand-status::before {
            content: '';
            width: 7px;
            height: 7px;
            background: #10b981;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(0.95);
            }
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: calc(100% - 84px);
            background: #f9fafb;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 20px;
            background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
            display: flex;
            flex-direction: column;
            gap: 14px;
            min-height: 0;
            -webkit-overflow-scrolling: touch;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 5px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.12);
            border-radius: 10px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 75%;
            word-wrap: break-word;
            word-break: break-word;
            font-size: 14.5px;
            line-height: 1.5;
            animation: messageFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
        }

        @keyframes messageFadeIn {
            from {
                opacity: 0;
                transform: translateY(10px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.06);
            color: var(--chat--color-font);
            align-self: flex-start;
            border-bottom-left-radius: 5px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .n8n-chat-widget .chat-input-wrapper {
            padding: 16px 20px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            display: flex;
            gap: 10px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input {
            flex: 1;
            display: flex;
            align-items: center;
            background: #f3f4f6;
            border-radius: 24px;
            padding: 4px 6px 4px 18px;
            transition: all 0.2s;
            border: 2px solid transparent;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input:focus-within {
            background: white;
            border-color: var(--chat--color-primary);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 10px 0;
            border: none;
            background: transparent;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14.5px;
            max-height: 100px;
            outline: none;
            -webkit-appearance: none;
            appearance: none;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #9ca3af;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            min-width: 40px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.08);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
        }

        .n8n-chat-widget .chat-input button:active {
            transform: scale(0.95);
        }

        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 
                0 6px 20px rgba(37, 99, 235, 0.3),
                0 2px 6px rgba(0, 0, 0, 0.1);
            z-index: 9998;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 
                0 8px 28px rgba(37, 99, 235, 0.4),
                0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(0.95);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
            transition: transform 0.3s;
        }

        .n8n-chat-widget .typing-indicator {
            display: flex;
            gap: 5px;
            padding: 14px 18px;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 18px;
            border-bottom-left-radius: 5px;
            width: fit-content;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 7px;
            height: 7px;
            background: #9ca3af;
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(1) {
            animation-delay: 0s;
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
                opacity: 0.5;
            }
            30% {
                transform: translateY(-8px);
                opacity: 1;
            }
        }

        .n8n-chat-widget .powered-by {
            padding: 12px 20px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            flex-shrink: 0;
        }

        .n8n-chat-widget .powered-by a {
            color: #6b7280;
            text-decoration: none;
            font-size: 12px;
            transition: all 0.2s;
            font-weight: 500;
            -webkit-tap-highlight-color: transparent;
        }

        .n8n-chat-widget .powered-by a:hover {
            color: var(--chat--color-primary);
        }

        body.chat-open-mobile {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }

        /* Message formatting */
        .n8n-chat-widget .chat-message a {
            color: inherit;
            text-decoration: underline;
            text-underline-offset: 2px;
        }

        .n8n-chat-widget .chat-message.user a {
            color: white;
        }
    `;

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
            responseTimeText: 'نرد عادة خلال دقائق',
            poweredBy: {
                text: 'Powered by TanT.AI',
                link: 'https://tant.manus.space'
            }
        },
        style: {
            primaryColor: '#5f720f',
            secondaryColor: '#4a5c0a',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#1a1a1a'
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
                <div class="brand-name">${config.branding.name}</div>
                <div class="brand-status">نشط الآن</div>
            </div>
            <button class="close-button" aria-label="Close chat">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages"></div>
            <div class="chat-input-wrapper">
                <div class="chat-input">
                    <textarea placeholder="اكتب رسالتك..." rows="1" aria-label="Type your message"></textarea>
                    <button type="submit" aria-label="Send message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="powered-by">
                <a href="${config.branding.poweredBy.link}" target="_blank" rel="noopener">${config.branding.poweredBy.text}</a>
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

    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const closeBtn = chatContainer.querySelector('.close-button');

    // Check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function generateUUID() {
        return crypto.randomUUID();
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.textContent = config.branding.welcomeText;
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    async function sendMessage(message) {
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
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        textarea.value = '';
        textarea.style.height = 'auto';

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            // Remove typing indicator
            typingIndicator.remove();
            
            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { output: responseText };
            }
            
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
            
            // Format the text
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
            typingIndicator.remove();
            console.error('=== ERROR ===', error);
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.textContent = 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Auto-resize textarea
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Event listeners
    toggleButton.addEventListener('click', () => {
        const isOpening = !chatContainer.classList.contains('open');
        chatContainer.classList.toggle('open');
        
        if (isOpening) {
            if (isMobile()) {
                document.body.classList.add('chat-open-mobile');
            }
            if (messagesContainer.children.length === 0) {
                startNewConversation();
            }
            setTimeout(() => {
                if (!isMobile()) {
                    textarea.focus();
                }
            }, 350);
        } else {
            document.body.classList.remove('chat-open-mobile');
        }
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('open');
        document.body.classList.remove('chat-open-mobile');
    });

    sendBtn.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
            }
        }
    });

    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
        if (chatContainer.classList.contains('open')) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (chatContainer.classList.contains('open') && !isMobile()) {
                document.body.classList.remove('chat-open-mobile');
            }
        }, 250);
    });
})();
