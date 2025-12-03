// Chat Widget Script - Ultra Modern Mobile-First Design
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #6366f1);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #8b5cf6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 999999;
            display: none;
            width: 400px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 24px;
            box-shadow: 
                0 0 0 1px rgba(0, 0, 0, 0.05),
                0 10px 25px rgba(0, 0, 0, 0.1),
                0 20px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            font-family: inherit;
            animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            will-change: transform, opacity;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
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
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 14px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-size: 20px;
            opacity: 0.9;
            border-radius: 10px;
            width: 34px;
            height: 34px;
            backdrop-filter: blur(10px);
            font-weight: 300;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .close-button:active {
            opacity: 1;
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-50%) scale(0.95);
        }

        @media (hover: hover) {
            .n8n-chat-widget .close-button:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.25);
                transform: translateY(-50%) rotate(90deg) scale(1.05);
            }
        }

        .n8n-chat-widget .brand-header img {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            object-fit: cover;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 2px solid rgba(255, 255, 255, 0.2);
            flex-shrink: 0;
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 3px;
            flex: 1;
            min-width: 0;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 17px;
            font-weight: 600;
            color: white;
            letter-spacing: -0.3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .n8n-chat-widget .brand-status {
            font-size: 12.5px;
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
            background: #4ade80;
            border-radius: 50%;
            display: inline-block;
            animation: statusPulse 2s ease-in-out infinite;
            box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
            flex-shrink: 0;
        }

        @keyframes statusPulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.6;
                transform: scale(0.85);
            }
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
            padding: 20px 18px;
            background: linear-gradient(180deg, #f9fafb 0%, #ffffff 40%);
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
            max-width: 80%;
            word-wrap: break-word;
            word-break: break-word;
            font-size: 14px;
            line-height: 1.6;
            animation: messagePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            hyphens: auto;
        }

        @keyframes messagePop {
            from {
                opacity: 0;
                transform: scale(0.92) translateY(10px);
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
            box-shadow: 0 2px 10px rgba(99, 102, 241, 0.25);
            border: none;
            border-radius: 18px 18px 4px 18px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.08);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            border-radius: 18px 18px 18px 4px;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 12px 16px;
            border-radius: 18px 18px 18px 4px;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            align-self: flex-start;
            display: flex;
            gap: 5px;
            align-items: center;
            max-width: 65px;
            animation: messagePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            animation: typingBounce 1.3s infinite;
            opacity: 0.6;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(1) {
            animation-delay: 0s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: 0.15s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation-delay: 0.3s;
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
            padding: 16px 18px 20px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0, 0, 0, 0.07);
            display: flex;
            gap: 10px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px 16px;
            border: 1.5px solid rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            background: #f9fafb;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            max-height: 100px;
            transition: all 0.2s ease;
            line-height: 1.5;
            -webkit-appearance: none;
            touch-action: manipulation;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: var(--chat--color-background);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.4;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 13px;
            width: 46px;
            height: 46px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .chat-input button:active {
            transform: scale(0.95);
        }

        @media (hover: hover) {
            .n8n-chat-widget .chat-input button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
            }
        }

        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
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
                0 8px 24px rgba(99, 102, 241, 0.3),
                0 0 0 0 rgba(99, 102, 241, 0);
            z-index: 999998;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 3s ease-in-out infinite;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
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
                transform: scale(1.1) translateY(-2px);
                box-shadow: 
                    0 12px 32px rgba(99, 102, 241, 0.4),
                    0 0 0 8px rgba(99, 102, 241, 0.08);
            }
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 26px;
            height: 26px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 10px;
            text-align: center;
            background: #f9fafb;
            border-top: 1px solid rgba(0, 0, 0, 0.07);
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 11px;
            opacity: 0.6;
            transition: opacity 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-footer a:active {
            opacity: 0.9;
        }

        @media (hover: hover) {
            .n8n-chat-widget .chat-footer a:hover {
                opacity: 0.9;
                text-decoration: underline;
            }
        }

        /* Tablet Responsive */
        @media (max-width: 768px) and (min-width: 481px) {
            .n8n-chat-widget .chat-container {
                width: 380px;
                height: 580px;
                bottom: 90px;
                right: 20px;
            }

            .n8n-chat-widget .chat-container.position-left {
                left: 20px;
            }

            .n8n-chat-widget .chat-toggle {
                width: 60px;
                height: 60px;
                bottom: 20px;
                right: 20px;
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 20px;
            }
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100vw;
                height: 100vh;
                height: 100dvh; /* Dynamic viewport height for mobile browsers */
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
                max-width: 100%;
                max-height: 100%;
            }

            .n8n-chat-widget .chat-container.position-left {
                left: 0;
            }

            .n8n-chat-widget .brand-header {
                padding: 16px 18px;
                padding-top: max(16px, env(safe-area-inset-top));
            }

            .n8n-chat-widget .brand-header img {
                width: 42px;
                height: 42px;
            }

            .n8n-chat-widget .brand-header span {
                font-size: 16px;
            }

            .n8n-chat-widget .brand-status {
                font-size: 12px;
            }

            .n8n-chat-widget .close-button {
                right: 14px;
                width: 32px;
                height: 32px;
                font-size: 18px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 16px 14px;
                padding-bottom: max(16px, env(safe-area-inset-bottom));
            }

            .n8n-chat-widget .chat-message {
                max-width: 85%;
                font-size: 14px;
                padding: 11px 14px;
            }

            .n8n-chat-widget .chat-input {
                padding: 14px 14px;
                padding-bottom: max(14px, env(safe-area-inset-bottom, 14px));
                gap: 8px;
            }

            .n8n-chat-widget .chat-input textarea {
                font-size: 16px; /* Prevent zoom on iOS */
                padding: 11px 14px;
            }

            .n8n-chat-widget .chat-input button {
                width: 44px;
                height: 44px;
            }

            .n8n-chat-widget .chat-toggle {
                width: 56px;
                height: 56px;
                bottom: 18px;
                right: 18px;
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 18px;
            }

            .n8n-chat-widget .chat-toggle svg {
                width: 24px;
                height: 24px;
            }

            .n8n-chat-widget .chat-footer {
                padding: 8px;
                padding-bottom: max(8px, env(safe-area-inset-bottom, 8px));
            }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
            .n8n-chat-widget .brand-header {
                padding: 14px 16px;
            }

            .n8n-chat-widget .brand-header img {
                width: 38px;
                height: 38px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 14px 12px;
            }

            .n8n-chat-widget .chat-message {
                font-size: 13px;
            }

            .n8n-chat-widget .chat-input {
                padding: 12px;
            }
        }

        /* Landscape mobile */
        @media (max-height: 500px) and (orientation: landscape) {
            .n8n-chat-widget .brand-header {
                padding: 12px 18px;
            }

            .n8n-chat-widget .brand-header img {
                width: 36px;
                height: 36px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 12px 14px;
            }

            .n8n-chat-widget .chat-input {
                padding: 10px 14px;
            }

            .n8n-chat-widget .chat-input textarea {
                max-height: 60px;
            }
        }
    `;

    // Load Inter font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    // Add viewport meta tag if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        document.head.appendChild(viewport);
    }

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

    // Auto-resize textarea
    function adjustTextareaHeight() {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }

    textarea.addEventListener('input', adjustTextareaHeight);

    function generateUUID() {
        return crypto.randomUUID();
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
        botMessageDiv.textContent = config.branding.welcomeText;
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
        console.log('Full
