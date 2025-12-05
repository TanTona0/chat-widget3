<script>
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
            position: fixed !important;
            bottom: 100px !important;
            right: 24px !important;
            top: auto !important;
            left: auto !important;
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
            box-sizing: border-box;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                bottom: 0 !important;
                right: 0 !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: 100% !important;
                max-width: 100vw !important;
                max-height: 100vh;
                max-height: 100dvh;
                border-radius: 0 !important;
                animation: slideUpMobile 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .n8n-chat-widget .chat-container.position-left {
                left: 0 !important;
                right: 0 !important;
            }

            .n8n-chat-widget .brand-header {
                padding: 18px 20px;
                padding-top: max(18px, env(safe-area-inset-top));
                gap: 10px;
            }

            .n8n-chat-widget .brand-header img {
                width: 42px;
                height: 42px;
            }

            .n8n-chat-widget .brand-name {
                font-size: 18px;
            }

            .n8n-chat-widget .brand-status {
                font-size: 12px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 20px 28px !important;
                box-sizing: border-box;
            }

            .n8n-chat-widget .chat-message {
                max-width: 70% !important;
                font-size: 15px;
                word-wrap: break-word;
                word-break: break-word;
                overflow-wrap: break-word;
                hyphens: auto;
                box-sizing: border-box;
            }

            .n8n-chat-widget .chat-message.user {
                margin-right: 0 !important;
            }

            .n8n-chat-widget .chat-message.bot {
                margin-left: 0 !important;
            }

            .n8n-chat-widget .chat-input-wrapper {
                padding: 14px 16px;
                padding-bottom: max(14px, env(safe-area-inset-bottom));
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 20px !important;
                right: 20px !important;
                width: 64px;
                height: 64px;
            }

            .n8n-chat-widget .chat-toggle.position-left {
                left: 20px !important;
                right: auto !important;
            }

            .n8n-chat-widget .chat-toggle svg {
                width: 28px;
                height: 28px;
            }

            .n8n-chat-widget .close-button {
                width: 34px;
                height: 34px;
                right: 16px;
            }
        }

        @media (max-width: 480px) {
            .n8n-chat-widget .chat-input textarea {
                font-size: 16px; /* Prevents zoom on iOS */
            }

            .n8n-chat-widget .brand-name {
                font-size: 17px;
            }

            .n8n-chat-widget .chat-messages {
                padding: 18px 26px !important;
                box-sizing: border-box;
            }

            .n8n-chat-widget .chat-message {
                max-width: 68% !important;
                font-size: 14px;
                padding: 12px 16px;
                word-wrap: break-word;
                word-break: break-word;
                overflow-wrap: break-word;
                box-sizing: border-box;
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
            right: auto !important;
            left: 24px !important;
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
            flex: 0 1 auto;
            min-width: 0;
            position: relative;
            z-index: 1;
        }

        .n8n-chat-widget .brand-name {
