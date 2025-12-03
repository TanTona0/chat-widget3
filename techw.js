// Chat Widget Script - Enhanced Modern Design with Loading Animation
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #6366f1);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #8b5cf6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 1000;
            display: none;
            width: 420px;
            height: 640px;
            background: var(--chat--color-background);
            border-radius: 28px;
            box-shadow: 
                0 0 0 1px rgba(0, 0, 0, 0.04),
                0 8px 16px rgba(0, 0, 0, 0.04),
                0 16px 32px rgba(0, 0, 0, 0.08),
                0 32px 64px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            font-family: inherit;
            animation: slideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(40px) scale(0.94);
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
            padding: 24px 28px;
            display: flex;
            align-items: center;
            gap: 16px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.18);
            border: none;
            color: white;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            font-size: 22px;
            opacity: 0.85;
            border-radius: 12px;
            width: 36px;
            height: 36px;
            backdrop-filter: blur(12px);
            font-weight: 300;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.28);
            transform: translateY(-50%) rotate(90deg) scale(1.05);
        }

        .n8n-chat-widget .brand-header img {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            object-fit: cover;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
            border: 2.5px solid rgba(255, 255, 255, 0.25);
        }

        .n8n-chat-widget .brand-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 600;
            color: white;
            letter-spacing: -0.4px;
        }

        .n8n-chat-widget .brand-status {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.88);
            display: flex;
            align-items: center;
            gap: 7px;
        }

        .n8n-chat-widget .brand-status::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            display: inline-block;
            animation: statusPulse 2.5s ease-in-out infinite;
            box-shadow: 0 0 10px rgba(74, 222, 128, 0.7);
        }

        @keyframes statusPulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.6;
                transform: scale(0.9);
            }
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: calc(100% - 97px);
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%);
            display: flex;
            flex-direction: column;
            gap: 16px;
            min-height: 0;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.18);
        }

        .n8n-chat-widget .chat-message {
            padding: 14px 18px;
            border-radius: 20px;
            max-width: 78%;
            word-wrap: break-word;
            font-size: 14.5px;
            line-height: 1.65;
            animation: messagePop 0.35s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
        }

        @keyframes messagePop {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(12px);
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
            box-shadow: 0 3px 14px rgba(99, 102, 241, 0.28);
            border: none;
            border-radius: 20px 20px 4px 20px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.07);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
            border-radius: 20px 20px 20px 4px;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 14px 18px;
            border-radius: 20px 20px 20px 4px;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.07);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
            align-self: flex-start;
            display: flex;
            gap: 6px;
            align-items: center;
            max-width: 70px;
            animation: messagePop 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            animation: typingBounce 1.4s infinite;
            opacity: 0.6;
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
                opacity: 0.6;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }

        .n8n-chat-widget .chat-input {
            padding: 18px 24px 22px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            display: flex;
            gap: 12px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 14px 18px;
            border: 1.5px solid rgba(0, 0, 0, 0.09);
            border-radius: 18px;
            background: #f8f9fa;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14.5px;
            max-height: 90px;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: var(--chat--color-background);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.42;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 14px;
            width: 48px;
            height: 48px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            font-family: inherit;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
        }

        .n8n-chat-widget .chat-input button:active {
            transform: translateY(-1px);
        }

        .n8n-chat-widget .chat-input button svg {
            width: 22px;
            height: 22px;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 
                0 10px 30px rgba(99, 102, 241, 0.35),
                0 0 0 0 rgba(99, 102, 241, 0);
            z-index: 999;
            transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 3.5s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-8px);
            }
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.12) translateY(-2px);
            box-shadow: 
                0 14px 40px rgba(99, 102, 241, 0.45),
                0 0 0 10px rgba(99, 102, 241, 0.1);
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
            background: #f8f9fa;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 11.5px;
            opacity: 0.65;
            transition: all 0.25s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 0.95;
            text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: calc(100vw - 24px);
                height: calc(100vh - 100px);
                bottom: 12px;
                right: 12px;
                border-radius: 24px;
            }

            .n8n-chat-widget .chat-container.position-left {
                left: 12px;
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

            .n8n-chat-widget .chat-toggle svg {
                width: 26px;
                height: 26px;
            }
        }
    `;

    // Load Inter font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
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
            <button class="close-button">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message..." rows="1"></textarea>
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

    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const closeBtn = chatContainer.querySelector('.close-button');

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
        console.log('Full Payload:', JSON.stringify(messageData, null, 2));

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        textarea.value = '';

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        try {
            console.log('Sending fetch request...');
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            console.log('Response Status:', response.status);
            console.log('Response OK:', response.ok);
            console.log('Response Headers:', [...response.headers.entries()]);
            
            const responseText = await response.text();
            console.log('Raw Response Text:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
                console.log('Parsed Response:', data);
            } catch (e) {
                console.log('Response is not JSON, using as text');
                data = { output: responseText };
            }
            
            // Remove typing indicator
            typingIndicator.remove();
            
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
            
            console.log('Bot Response Text:', botText);
            
            // Format the text: convert \n to <br> and handle bullets
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
            console.error('=== ERROR ===');
            console.error('Error Type:', error.name);
            console.error('Error Message:', error.message);
            console.error('Full Error:', error);
            
            // Remove typing indicator
            typingIndicator.remove();
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.textContent = 'Error: Could not send message. Check console for details.';
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Event listeners
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
})();
