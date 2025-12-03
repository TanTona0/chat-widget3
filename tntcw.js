<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="theme-color" content="#5f720f">
    <title>Chat Widget Demo</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #f0f0f0;
        }
        .demo-content {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
        }
        @media (max-width: 480px) {
            .demo-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="demo-content">
        <h1>Enhanced Chat Widget Demo</h1>
        <p>✨ Fully mobile-responsive chat widget with accessibility features</p>
        <p><strong>Features:</strong></p>
        <ul>
            <li>📱 Mobile-optimized (full-screen on small devices)</li>
            <li>♿ WCAG 2.1 AA accessible</li>
            <li>⌨️ Keyboard navigation (Tab, Esc, Enter)</li>
            <li>🌍 RTL support for Arabic</li>
            <li>🎨 iOS safe area support</li>
        </ul>
        <p><strong>Note:</strong> Configure your webhook URL in the script below.</p>
    </div>

    <script>
        // Configuration - EDIT THIS
        window.ChatWidgetConfig = {
            webhook: {
                url: 'https://your-webhook-url.com/webhook',
                route: '',
                timeout: 30000 // 30 seconds
            },
            branding: {
                logo: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2021/09/Olive-oil-logo-design-on-transparent-background-PNG.png',
                name: 'Oliye',
                welcomeText: 'مرحبًا 👋، كيف يمكنني مساعدتك؟',
                responseTimeText: 'نجيب عادةً خلال دقائق',
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
            },
            features: {
                enableSound: false,
                enableHaptic: true,
                saveHistory: true,
                maxRetries: 3
            }
        };
    </script>

    <!-- Enhanced Chat Widget Script -->
    <script>
(function() {
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #6366f1);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #8b5cf6);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1f2937);
            --chat--safe-area-inset-top: env(safe-area-inset-top);
            --chat--safe-area-inset-bottom: env(safe-area-inset-bottom);
            --chat--safe-area-inset-left: env(safe-area-inset-left);
            --chat--safe-area-inset-right: env(safe-area-inset-right);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
            height: 600px;
            max-height: calc(100vh - 130px);
            background: var(--chat--color-background);
            border-radius: 24px;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 10px 25px rgba(0,0,0,0.1), 0 20px 50px rgba(0,0,0,0.15);
            overflow: hidden;
            animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
            will-change: transform, opacity;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes slideDown {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(30px) scale(0.95); }
        }

        .n8n-chat-widget .chat-container.closing {
            animation: slideDown 0.25s cubic-bezier(0.4, 0, 1, 1);
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
            padding-top: max(20px, var(--chat--safe-area-inset-top));
            display: flex;
            align-items: center;
            gap: 14px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            position: relative;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            flex-shrink: 0;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.15);
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
            min-width: 44px;
            min-height: 44px;
            backdrop-filter: blur(10px);
            font-weight: 300;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .close-button:hover,
        .n8n-chat-widget .close-button:focus {
            opacity: 1;
            background: rgba(255,255,255,0.25);
            transform: translateY(-50%) rotate(90deg) scale(1.05);
            outline: 2px solid rgba(255,255,255,0.4);
            outline-offset: 2px;
        }

        .n8n-chat-widget .close-button:active {
            transform: translateY(-50%) rotate(90deg) scale(0.95);
        }

        .n8n-chat-widget .brand-header img {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            object-fit: cover;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 2px solid rgba(255,255,255,0.2);
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
        }

        .n8n-chat-widget .brand-status {
            font-size: 12.5px;
            font-weight: 500;
            color: rgba(255,255,255,0.85);
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
            box-shadow: 0 0 8px rgba(74,222,128,0.6);
        }

        @keyframes statusPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.85); }
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
            overscroll-behavior: contain;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 5px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.12);
            border-radius: 10px;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 80%;
            word-wrap: break-word;
            word-break: break-word;
            font-size: 14px;
            line-height: 1.6;
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
            box-shadow: 0 2px 10px rgba(99,102,241,0.25);
            border-radius: 18px 18px 4px 18px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(0,0,0,0.08);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            border-radius: 18px 18px 18px 4px;
        }

        .n8n-chat-widget .chat-message.error {
            background: #fee;
            border-color: #fcc;
            color: #c33;
        }

        .n8n-chat-widget .retry-button {
            display: inline-block;
            margin-top: 8px;
            padding: 6px 12px;
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            min-height: 32px;
            -webkit-tap-highlight-color: transparent;
        }

        .n8n-chat-widget .retry-button:hover {
            background: #b91c1c;
        }

        .n8n-chat-widget .typing-indicator {
            padding: 12px 16px;
            border-radius: 18px 18px 18px 4px;
            background: white;
            border: 1px solid rgba(0,0,0,0.08);
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            align-self: flex-start;
            display: flex;
            gap: 5px;
            align-items: center;
            animation: messagePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .n8n-chat-widget .typing-indicator span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            animation: typingBounce 1.3s infinite;
            opacity: 0.6;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) { animation-delay: 0.15s; }
        .n8n-chat-widget .typing-indicator span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
            30% { transform: translateY(-8px); opacity: 1; }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px 18px;
            padding-bottom: max(16px, var(--chat--safe-area-inset-bottom));
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0,0,0,0.07);
            display: flex;
            gap: 10px;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px 16px;
            border: 1.5px solid rgba(0,0,0,0.1);
            border-radius: 16px;
            background: #f9fafb;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 16px; /* Prevents iOS zoom */
            max-height: 100px;
            transition: all 0.2s ease;
            line-height: 1.5;
            -webkit-appearance: none;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: var(--chat--color-background);
            box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
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
            min-width: 46px;
            min-height: 46px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(99,102,241,0.25);
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        .n8n-chat-widget .chat-input button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(99,102,241,0.35);
        }

        .n8n-chat-widget .chat-input button:active:not(:disabled) {
            transform: translateY(0);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            bottom: max(24px, calc(var(--chat--safe-area-inset-bottom) + 8px));
            right: 24px;
            right: max(24px, calc(var(--chat--safe-area-inset-right) + 8px));
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(99,102,241,0.3);
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
            50% { transform: translateY(-6px); }
        }

        .n8n-chat-widget .chat-toggle:hover,
        .n8n-chat-widget .chat-toggle:focus {
            transform: scale(1.1) translateY(-2px);
            box-shadow: 0 12px 32px rgba(99,102,241,0.4);
            outline: 2px solid rgba(99,102,241,0.4);
            outline-offset: 2px;
        }

        .n8n-chat-widget .chat-toggle:active {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
            left: max(24px, calc(var(--chat--safe-area-inset-left) + 8px));
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
            border-top: 1px solid rgba(0,0,0,0.07);
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 11px;
            opacity: 0.6;
            transition: opacity 0.2s;
        }

        .n8n-chat-widget .chat-footer a:hover,
        .n8n-chat-widget .chat-footer a:focus {
            opacity: 0.9;
            outline: 1px dotted;
        }

        /* RTL Support for Arabic */
        .n8n-chat-widget .chat-message[dir="rtl"] {
            text-align: right;
        }

        .n8n-chat-widget .chat-message.user[dir="rtl"] {
            border-radius: 18px 18px 18px 4px;
        }

        .n8n-chat-widget .chat-message.bot[dir="rtl"] {
            border-radius: 18px 18px 4px 18px;
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
            
            .n8n-chat-widget .chat-toggle {
                width: 56px;
                height: 56px;
                bottom: 18px;
                bottom: max(18px, calc(var(--chat--safe-area-inset-bottom) + 8px));
                right: 18px;
                right: max(18px, calc(var(--chat--safe-area-inset-right) + 8px));
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 18px;
                left: max(18px, calc(var(--chat--safe-area-inset-left) + 8px));
            }

            .n8n-chat-widget .chat-toggle svg {
                width: 24px;
                height: 24px;
            }

            .n8n-chat-widget .chat-message {
                max-width: 85%;
            }

            .n8n-chat-widget .brand-header {
                padding: 16px 18px;
                padding-top: max(16px, calc(var(--chat--safe-area-inset-top) + 16px));
            }

            .n8n-chat-widget .chat-input {
                padding: 12px 16px;
                padding-bottom: max(12px, calc(var(--chat--safe-area-inset-bottom) + 12px));
            }
        }

        @media (max-width: 360px) {
            .n8n-chat-widget .chat-message {
                font-size: 13px;
                max-width: 90%;
            }
        }

        /* Landscape Mobile */
        @media (max-height: 500px) and (orientation: landscape) {
            .n8n-chat-widget .chat-container {
                height: 100vh;
            }
            
            .n8n-chat-widget .brand-header {
                padding: 12px 18px;
            }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
            .n8n-chat-widget .chat-message.bot {
                border-width: 2px;
            }
            
            .n8n-chat-widget .close-button:focus,
            .n8n-chat-widget .chat-toggle:focus {
                outline-width: 3px;
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

        /* Focus visible for keyboard navigation */
        .n8n-chat-widget *:focus-visible {
            outline: 2px solid var(--chat--color-primary);
            outline-offset: 2px;
        }

        /* Loading state */
        .n8n-chat-widget .chat-input button.loading::after {
            content: '';
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .n8n-chat-widget .chat-input button.loading svg {
            display: none;
        }
    `;

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const defaultConfig = {
        webhook: { url: '', route: '', timeout: 30000 },
        branding: {
            logo: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2021/09/Olive-oil-logo-design-on-transparent-background-PNG.png',
            name: 'Oliye',
            welcomeText: 'مرحبًا 👋، كيف يمكنني مساعدتك؟',
            responseTimeText: 'نجيب عادةً خلال دقائق',
            poweredBy: { text: 'Powered by TanT.AI', link: 'https://tant.manus.space' }
        },
        style: {
            primaryColor: '#5f720f',
            secondaryColor: '#5f720f',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        features: {
            enableSound: false,
            enableHaptic: true,
            saveHistory: true,
            maxRetries: 3
        }
    };

    const config = window.ChatWidgetConfig ? {
        webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
        branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
        style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
        features: { ...defaultConfig.features, ...window.ChatWidgetConfig.features }
    } : defaultConfig;

    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let messageRetries = new Map();

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    widgetContainer.setAttribute('role', 'region');
    widgetContainer.setAttribute('aria-label', 'Chat widget');
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    chatContainer.setAttribute('role', 'dialog');
    chatContainer.setAttribute('aria-modal', 'false');
    chatContainer.setAttribute('aria-labelledby', 'chat-header-title');
    
    chatContainer.innerHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name} logo">
            <div class="brand-info">
                <span id="chat-header-title">${config.branding.name}</span>
                <div class="brand-status" role="status" aria-live="polite">Online</div>
            </div>
            <button class="close-button" aria-label="Close chat" title="Close chat (Esc)">×</button>
        </div>
        <div class="chat-interface">
            <div class="chat-messages" role="log" aria-live="polite" aria-atomic="false"></div>
            <div class="chat-input" role="form">
                <textarea 
                    placeholder="اكتب رسالتك..." 
                    rows="1" 
                    aria-label="Message input"
                    maxlength="2000"
                ></textarea>
                <button type="submit" aria-label="Send message" title="Send message (Enter)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank" rel="noopener noreferrer">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.setAttribute('aria-label', 'Open chat');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const closeBtn = chatContainer.querySelector('.close-button');

    // Debounced textarea height adjustment
    let resizeTimeout;
    function adjustTextareaHeight() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
        }, 10);
    }

    textarea.addEventListener('input', adjustTextareaHeight);

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function triggerHaptic() {
        if (config.features.enableHaptic && navigator.vibrate) {
            navigator.vibrate(10);
        }
    }

    function detectRTL(text) {
        const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return rtlChars.test(text);
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.setAttribute('aria-label', 'Assistant is typing');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        addBotMessage(config.branding.welcomeText);
    }

    function addBotMessage(text) {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.setAttribute('role', 'article');
        
        if (detectRTL(text)) {
            botMessageDiv.setAttribute('dir', 'rtl');
        }
        
        const formattedText = text
            .replace(/\\n/g, '\n')
            .split('\n')
            .map(line => {
                if (line.trim().startsWith('*')) {
                    return `<span style="display: block; padding-left: 8px; margin: 4px 0;">• ${escapeHtml(line.trim().substring(1).trim())}</span>`;
                }
                return line.trim() ? `<span style="display: block; margin: 4px 0;">${escapeHtml(line.trim())}</span>` : '';
            })
            .filter(line => line)
            .join('');
        
        botMessageDiv.innerHTML = formattedText;
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async function sendMessage(message, retryCount = 0) {
        const messageId = generateUUID();
        const messageData = {
            chatInput: message,
            sessionId: currentSessionId
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.setAttribute('role', 'article');
        userMessageDiv.textContent = message;
        
        if (detectRTL(message)) {
            userMessageDiv.setAttribute('dir', 'rtl');
        }
        
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        textarea.value = '';
        adjustTextareaHeight();
        
        triggerHaptic();

        sendBtn.classList.add('loading');
        sendBtn.disabled = true;
        const typingIndicator = showTypingIndicator();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.webhook.timeout);

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { output: responseText };
            }
            
            typingIndicator.remove();
            sendBtn.classList.remove('loading');
            sendBtn.disabled = false;
            
            let botText = '';
            if (typeof data === 'string') {
                botText = data;
            } else if (Array.isArray(data)) {
                botText = data[0]?.output || data[0]?.message || data[0]?.text || JSON.stringify(data[0]);
            } else {
                botText = data.output || data.message || data.text || JSON.stringify(data);
            }
            
            addBotMessage(botText);
            messageRetries.delete(messageId);
            triggerHaptic();
        } catch (error) {
            console.error('Error:', error);
            clearTimeout(timeoutId);
            typingIndicator.remove();
            sendBtn.classList.remove('loading');
            sendBtn.disabled = false;
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot error';
            errorDiv.setAttribute('role', 'alert');
            
            let errorMessage = 'عذراً، حدث خطأ. ';
            if (error.name === 'AbortError') {
                errorMessage += 'انتهت مهلة الطلب.';
            } else if (!navigator.onLine) {
                errorMessage += 'تحقق من اتصالك بالإنترنت.';
            } else {
                errorMessage += error.message || 'يرجى المحاولة مرة أخرى.';
            }
            
            errorDiv.textContent = errorMessage;
            
            if (retryCount < config.features.maxRetries) {
                const retryBtn = document.createElement('button');
                retryBtn.className = 'retry-button';
                retryBtn.textContent = 'إعادة المحاولة';
                retryBtn.setAttribute('aria-label', 'Retry sending message');
                retryBtn.onclick = () => {
                    errorDiv.remove();
                    sendMessage(message, retryCount + 1);
                };
                errorDiv.appendChild(retryBtn);
            }
            
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatContainer.classList.contains('open')) {
            closeChat();
        }
    });

    // Focus trap for accessibility
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    }

    function openChat() {
        chatContainer.classList.add('open');
        toggleButton.setAttribute('aria-expanded', 'true');
        toggleButton.setAttribute('aria-label', 'Close chat');
        
        if (messagesContainer.children.length === 0) {
            startNewConversation();
        }
        
        setTimeout(() => {
            textarea.focus();
            trapFocus(chatContainer);
        }, 350);
        
        triggerHaptic();
    }

    function closeChat() {
        chatContainer.classList.add('closing');
        setTimeout(() => {
            chatContainer.classList.remove('open', 'closing');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.setAttribute('aria-label', 'Open chat');
            toggleButton.focus();
        }, 250);
        
        triggerHaptic();
    }

    toggleButton.addEventListener('click', () => {
        if (chatContainer.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
        }
    });

    closeBtn.addEventListener('click', closeChat);

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

    // Handle viewport resize on mobile (keyboard show/hide)
    let lastHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 480 && chatContainer.classList.contains('open')) {
            const currentHeight = window.innerHeight;
            if (currentHeight < lastHeight) {
                // Keyboard opened
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            lastHeight = currentHeight;
        }
    });

    // Handle online/offline status
    function updateOnlineStatus() {
        const statusEl = chatContainer.querySelector('.brand-status');
        if (navigator.onLine) {
            statusEl.textContent = 'Online';
            statusEl.style.setProperty('--status-color', '#4ade80');
        } else {
            statusEl.textContent = 'Offline';
            statusEl.style.setProperty('--status-color', '#ef4444');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Prevent zoom on iOS when focusing inputs
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            const content = viewportMeta.getAttribute('content');
            if (!content.includes('maximum-scale')) {
                viewportMeta.setAttribute('content', content + ', maximum-scale=1.0');
            }
        }
    }

    console.log('✅ Enhanced Chat Widget Initialized');
})();
    </script>
</body>
</html>
