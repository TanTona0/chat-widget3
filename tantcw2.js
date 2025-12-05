// Ultra Modern Chat Widget - Next-Gen Design
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #6366f1);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #8b5cf6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #0f172a);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 100px;
            right: 24px;
            z-index: 9999;
            display: none;
            width: 420px;
            height: 680px;
            background: var(--chat--color-background);
            border-radius: 24px;
            box-shadow: 
                0 0 0 1px rgba(0, 0, 0, 0.03),
                0 20px 40px rgba(0, 0, 0, 0.08),
                0 40px 80px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            font-family: inherit;
            animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            backdrop-filter: blur(40px);
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
                animation: slideUpMobile 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .n8n-chat-widget .brand-header {
                padding: 20px;
                padding-top: max(20px, env(safe-area-inset-top));
            }

            .n8n-chat-widget .chat-messages {
                padding: 16px;
            }

            .n8n-chat-widget .chat-input-wrapper {
                padding: 16px;
                padding-bottom: max(16px, env(safe-area-inset-bottom));
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 20px;
                right: 20px;
                width: 64px;
                height: 64px;
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 20px;
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
                transform: translateY(24px) scale(0.94);
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

        /* Ultra Modern Glassmorphic Header */
        .n8n-chat-widget .brand-header {
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, 
                var(--chat--color-primary) 0%, 
                var(--chat--color-secondary) 100%);
            position: relative;
            flex-shrink: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget .brand-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.5;
            pointer-events: none;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-size: 20px;
            border-radius: 12px;
            width: 36px;
            height: 36px;
            -webkit-tap-highlight-color: transparent;
            backdrop-filter: blur(10px);
        }

        .n8n-chat-widget .close-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-50%) rotate(90deg) scale(1.05);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .n8n-chat-widget .close-button:active {
            transform: translateY(-50%) scale(0.9);
        }

        /* Neumorphic Logo Container */
        .n8n-chat-widget .logo-container {
            position: relative;
            flex-shrink: 0;
        }

        .n8n-chat-widget .brand-header img {
            width: 46px;
            height: 46px;
            border-radius: 14px;
            object-fit: cover;
            flex-shrink: 0;
            background: white;
            padding: 3px;
            box-shadow: 
                0 4px 12px rgba(0, 0, 0, 0.15),
                inset 0 -1px 2px rgba(0, 0, 0, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.25);
            position: relative;
            z-index: 1;
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;
            min-width: 0;
            position: relative;
            z-index: 1;
        }

        .n8n-chat-widget .brand-name {
            font-size: 20px;
            font-weight: 700;
            color: white;
            line-height: 1.2;
            letter-spacing: -0.03em;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .brand-status {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            gap: 6px;
            text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }

        .n8n-chat-widget .brand-status::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            display: inline-block;
            animation: statusPulse 2s ease-in-out infinite;
            box-shadow: 
                0 0 0 0 rgba(16, 185, 129, 0.7),
                0 0 8px rgba(16, 185, 129, 0.5);
        }

        @keyframes statusPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7), 0 0 8px rgba(16, 185, 129, 0.5);
            }
            50% {
                box-shadow: 0 0 0 4px rgba(16, 185, 129, 0), 0 0 12px rgba(16, 185, 129, 0.3);
            }
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: calc(100% - 100px);
            background: #fafbfc;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 24px;
            background: 
                radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
                #fafbfc;
            display: flex;
            flex-direction: column;
            gap: 16px;
            min-height: 0;
            -webkit-overflow-scrolling: touch;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, var(--chat--color-primary), var(--chat--color-secondary));
            border-radius: 10px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: var(--chat--color-primary);
        }

        /* Next-Gen Message Bubbles */
        .n8n-chat-widget .chat-message {
            padding: 14px 18px;
            border-radius: 22px;
            max-width: 72%;
            word-wrap: break-word;
            word-break: break-word;
            font-size: 15px;
            line-height: 1.5;
            animation: messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
        }

        @keyframes messagePop {
            0% {
                opacity: 0;
                transform: translateY(12px) scale(0.9);
            }
            60% {
                transform: translateY(-2px) scale(1.02);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 6px;
            box-shadow: 
                0 4px 16px rgba(99, 102, 241, 0.25),
                0 8px 32px rgba(99, 102, 241, 0.15);
            position: relative;
            overflow: hidden;
        }

        .n8n-chat-widget .chat-message.user::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.06);
            color: var(--chat--color-font);
            align-self: flex-start;
            border-bottom-left-radius: 6px;
            box-shadow: 
                0 2px 8px rgba(0, 0, 0, 0.04),
                0 8px 24px rgba(0, 0, 0, 0.03);
        }

        /* Modern Input Area with Glassmorphism */
        .n8n-chat-widget .chat-input-wrapper {
            padding: 20px 24px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            gap: 12px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input {
            flex: 1;
            display: flex;
            align-items: center;
            background: #f8f9fa;
            border-radius: 24px;
            padding: 5px 5px 5px 20px;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 2px solid transparent;
            gap: 10px;
        }

        .n8n-chat-widget .chat-input:focus-within {
            background: white;
            border-color: var(--chat--color-primary);
            box-shadow: 
                0 0 0 4px rgba(99, 102, 241, 0.08),
                0 8px 16px rgba(99, 102, 241, 0.1);
            transform: translateY(-2px);
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 11px 0;
            border: none;
            background: transparent;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 15px;
            max-height: 100px;
            outline: none;
            -webkit-appearance: none;
            appearance: none;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #94a3b8;
        }

        /* Futuristic Send Button */
        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            min-width: 44px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 
                0 4px 12px rgba(99, 102, 241, 0.3),
                0 2px 6px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .n8n-chat-widget .chat-input button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.5s;
        }

        .n8n-chat-widget .chat-input button:hover::before {
            transform: translate(-50%, -50%) scale(1);
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.1) rotate(15deg);
            box-shadow: 
                0 6px 20px rgba(99, 102, 241, 0.4),
                0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .chat-input button:active {
            transform: scale(0.95) rotate(0deg);
        }

        .n8n-chat-widget .chat-input button svg {
            width: 22px;
            height: 22px;
            fill: currentColor;
            position: relative;
            z-index: 1;
        }

        /* Levitating Toggle Button */
        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 
                0 10px 30px rgba(99, 102, 241, 0.4),
                0 5px 15px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            z-index: 9998;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent;
            animation: levitate 4s ease-in-out infinite;
            position: relative;
            overflow: hidden;
        }

        .n8n-chat-widget .chat-toggle::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: rotate(45deg);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% {
                transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            100% {
                transform: translateX(100%) translateY(100%) rotate(45deg);
            }
        }

        @keyframes levitate {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
                box-shadow: 
                    0 10px 30px rgba(99, 102, 241, 0.4),
                    0 5px 15px rgba(0, 0, 0, 0.2);
            }
            50% {
                transform: translateY(-12px) rotate(5deg);
                box-shadow: 
                    0 20px 40px rgba(99, 102, 241, 0.5),
                    0 10px 25px rgba(0, 0, 0, 0.25);
            }
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.15) rotate(-5deg);
            box-shadow: 
                0 15px 40px rgba(99, 102, 241, 0.5),
                0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(0.95);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 32px;
            height: 32px;
            fill: currentColor;
            transition: transform 0.4s;
            position: relative;
            z-index: 1;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        /* Modern Typing Indicator */
        .n8n-chat-widget .typing-indicator {
            display: flex;
            gap: 6px;
            padding: 16px 20px;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 22px;
            border-bottom-left-radius: 6px;
            width: fit-content;
            box-shadow: 
                0 2px 8px rgba(0, 0, 0, 0.04),
                0 8px 24px rgba(0, 0, 0, 0.03);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            border-radius: 50%;
            animation: typingDance 1.4s infinite ease-in-out;
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

        @keyframes typingDance {
            0%, 60%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.5;
            }
            30% {
                transform: translateY(-10px) scale(1.2);
                opacity: 1;
            }
        }

        .n8n-chat-widget .powered-by {
            padding: 14px 24px;
            text-align: center;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(0, 0, 0, 0.04);
            flex-shrink: 0;
        }

        .n8n-chat-widget .powered-by a {
            color: #64748b;
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
            primaryColor: '#6366f1',
            secondaryColor: '#8b5cf6',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#0f172a'
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
            <div class="logo-container">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
            </div>
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

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const closeBtn = chatContainer.querySelector('.close-button');

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
        console.log('Message:', message);

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
            console.error('Error:', error);
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.textContent = 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

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
            }, 400);
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

    window.addEventListener('orientationchange', () => {
        if (chatContainer.classList.contains('open')) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    });

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
