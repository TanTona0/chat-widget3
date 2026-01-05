// Modern Chat Widget - Premium Design
(function() {
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #6366f1);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #8b5cf6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SF Pro Display', sans-serif;
        }
        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 100px;
            right: 24px;
            z-index: 10000;
            display: none;
            width: 400px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 32px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid rgba(0, 0, 0, 0.08);
        }
        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 0;
                max-width: 100%;
                max-height: 100%;
            }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(16px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
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
            direction: rtl;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .n8n-chat-widget .brand-header img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
            letter-spacing: -0.01em;
        }
        .n8n-chat-widget .brand-status {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.85);
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
        }
        .n8n-chat-widget .brand-status::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6); }
            50% { opacity: 0.9; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0); }
        }
        .n8n-chat-widget .close-button {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: none;
            color: white;
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 20px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .n8n-chat-widget .close-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-50%) scale(1.08);
        }
        .n8n-chat-widget .close-button:active {
            transform: translateY(-50%) scale(0.95);
        }
        .n8n-chat-widget .clear-chat-button {
            position: absolute;
            left: 60px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: none;
            color: white;
            cursor: pointer;
            padding: 8px 14px;
            border-radius: 24px;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        .n8n-chat-widget .clear-chat-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-50%) scale(1.03);
        }
        .n8n-chat-widget .clear-chat-button:active {
            transform: translateY(-50%) scale(0.97);
        }
        .n8n-chat-widget .clear-chat-button svg {
            width: 14px;
            height: 14px;
        }
        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: calc(100% - 85px);
        }
        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #fafafa;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }
        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }
        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.12);
            border-radius: 10px;
        }
        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.18);
        }
        .n8n-chat-widget .chat-message {
            padding: 14px 18px;
            border-radius: 24px;
            max-width: 80%;
            font-size: 14px;
            line-height: 1.5;
            animation: messagePop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            word-wrap: break-word;
        }
        @keyframes messagePop {
            from { opacity: 0; transform: translateY(8px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
            border-bottom-right-radius: 8px;
        }
        .n8n-chat-widget .chat-message.bot {
            background: white;
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-bottom-left-radius: 8px;
        }
        .n8n-chat-widget .typing-indicator {
            padding: 16px 18px;
            border-radius: 24px;
            background: white;
            align-self: flex-start;
            display: flex;
            gap: 5px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-bottom-left-radius: 8px;
        }
        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            opacity: 0.3;
            animation: typingBounce 1.4s infinite ease-in-out;
        }
        .n8n-chat-widget .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .n8n-chat-widget .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
            0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
            30% { opacity: 1; transform: translateY(-6px); }
        }
        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: white;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            display: flex;
            gap: 10px;
            align-items: flex-end;
        }
        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 14px 18px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 24px;
            background: #fafafa;
            resize: none;
            font-size: 14px;
            max-height: 100px;
            font-family: inherit;
            color: var(--chat--color-font);
            transition: all 0.2s ease;
        }
        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: white;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
        }
        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #9ca3af;
        }
        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
            flex-shrink: 0;
        }
        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
        }
        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.08);
            box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
        }
        .n8n-chat-widget .chat-input button:active {
            transform: scale(0.95);
        }
        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35), 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 12px 32px rgba(99, 102, 241, 0.45), 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        .n8n-chat-widget .chat-toggle:active {
            transform: scale(1.0);
        }
        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
        }
        .n8n-chat-widget .chat-footer {
            padding: 10px;
            text-align: center;
            background: white;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
        }
        .n8n-chat-widget .chat-footer a {
            color: #6b7280;
            text-decoration: none;
            font-size: 12px;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            font-weight: 500;
        }
        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }
        @media (max-width: 768px) {
            .n8n-chat-widget .brand-header {
                border-radius: 0;
            }
            .n8n-chat-widget .chat-footer {
                border-radius: 0;
            }
            .n8n-chat-widget .chat-toggle {
                width: 52px;
                height: 52px;
                bottom: 16px;
                right: 16px;
            }
            .n8n-chat-widget .chat-toggle svg {
                width: 22px;
                height: 22px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: 'https://via.placeholder.com/44',
            name: 'Chat Assistant',
            welcomeText: 'مرحبًا 👋، كيف يمكنني مساعدتك؟',
            poweredBy: { text: 'Powered by TanT AI', link: 'https://tantai.manus.space' }
        },
        style: { primaryColor: '#6366f1', secondaryColor: '#8b5cf6', backgroundColor: '#ffffff', fontColor: '#1f2937' }
    };

    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    let currentSessionId = '';
    const STORAGE_KEYS = { SESSION_ID: 'n8n_chat_session_id', MESSAGES: 'n8n_chat_messages' };

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    widgetContainer.innerHTML = `
        <div class="chat-container">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <div class="brand-info">
                    <span>${config.branding.name}</span>
                    <div class="brand-status">متصل الآن</div>
                </div>
                <button class="clear-chat-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                    مسح السجل
                </button>
                <button class="close-button">×</button>
            </div>
            <div class="chat-interface">
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <textarea placeholder="اكتب رسالتك هنا..." rows="1"></textarea>
                    <button>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
                <div class="chat-footer">
                    <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
                </div>
            </div>
        </div>
        <button class="chat-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
        </button>
    `;

    document.body.appendChild(widgetContainer);

    const chatContainer = widgetContainer.querySelector('.chat-container');
    const messagesContainer = widgetContainer.querySelector('.chat-messages');
    const textarea = widgetContainer.querySelector('textarea');
    const sendBtn = widgetContainer.querySelector('.chat-input button');
    const closeBtn = widgetContainer.querySelector('.close-button');
    const clearBtn = widgetContainer.querySelector('.clear-chat-button');
    const toggleBtn = widgetContainer.querySelector('.chat-toggle');

    function generateUUID() { return crypto.randomUUID(); }
    
    function saveToStorage(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } 
        catch (e) { console.error('Storage error:', e); }
    }
    
    function loadFromStorage(key) {
        try { 
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : (key === STORAGE_KEYS.MESSAGES ? [] : '');
        } catch (e) { return key === STORAGE_KEYS.MESSAGES ? [] : ''; }
    }

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = `chat-message ${type}`;
        if (type === 'bot') {
            div.innerHTML = text.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
        } else {
            div.textContent = text;
        }
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        const messages = loadFromStorage(STORAGE_KEYS.MESSAGES);
        messages.push({ text, type });
        saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    }

    function restoreChat() {
        const messages = loadFromStorage(STORAGE_KEYS.MESSAGES);
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = `chat-message ${msg.type}`;
            if (msg.type === 'bot') {
                div.innerHTML = msg.text.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
            } else {
                div.textContent = msg.text;
            }
            messagesContainer.appendChild(div);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function startChat() {
        currentSessionId = loadFromStorage(STORAGE_KEYS.SESSION_ID);
        if (!currentSessionId) {
            currentSessionId = generateUUID();
            saveToStorage(STORAGE_KEYS.SESSION_ID, currentSessionId);
            addMessage(config.branding.welcomeText, 'bot');
        } else {
            restoreChat();
        }
    }

    async function sendMessage(text) {
        addMessage(text, 'user');
        textarea.value = '';

        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatInput: text, sessionId: currentSessionId })
            });
            
            const data = await response.json();
            typing.remove();
            
            // Extract bot text from nested response structure
            let botText = '';
            
            // Try multiple possible response structures
            if (data.output) {
                botText = data.output;
            } else if (data.message) {
                botText = data.message;
            } else if (data.text) {
                botText = data.text;
            } else if (Array.isArray(data) && data[0]?.output) {
                botText = data[0].output;
            } else {
                // Fallback: stringify the entire response
                botText = JSON.stringify(data);
            }
            
            // If botText is still a stringified JSON, try to parse it
            if (typeof botText === 'string' && (botText.startsWith('[{') || botText.startsWith('{'))) {
                try {
                    const parsed = JSON.parse(botText);
                    if (Array.isArray(parsed) && parsed[0]?.output) {
                        botText = parsed[0].output;
                    } else if (parsed.output) {
                        botText = parsed.output;
                    }
                } catch (e) {
                    // If parsing fails, continue with the original text
                }
            }
            
            // Clean up escape characters and formatting
            botText = String(botText)
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\')
                .replace(/\\t/g, '\t')
                .trim();
            
            addMessage(botText, 'bot');
        } catch (error) {
            typing.remove();
            addMessage('عذراً، حدث خطأ في الاتصال', 'bot');
            console.error(error);
        }
    }

    toggleBtn.onclick = () => {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open') && !messagesContainer.children.length) {
            startChat();
        }
    };

    closeBtn.onclick = () => chatContainer.classList.remove('open');

    clearBtn.onclick = () => {
        if (confirm('هل تريد مسح سجل المحادثة؟')) {
            localStorage.removeItem(STORAGE_KEYS.MESSAGES);
            localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
            messagesContainer.innerHTML = '';
            currentSessionId = generateUUID();
            saveToStorage(STORAGE_KEYS.SESSION_ID, currentSessionId);
            addMessage(config.branding.welcomeText, 'bot');
        }
    };

    sendBtn.onclick = () => {
        const msg = textarea.value.trim();
        if (msg) sendMessage(msg);
    };

    textarea.onkeypress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const msg = textarea.value.trim();
            if (msg) sendMessage(msg);
        }
    };
})();
