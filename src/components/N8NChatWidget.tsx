import { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'n8nchatui-inpage': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export const N8NChatWidget = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Add the chat widget element
    const chatElement = document.createElement('n8nchatui-inpage');
    document.body.appendChild(chatElement);

    // Create and append the script
    const script = document.createElement('script');
    script.type = 'module';
    script.defer = true;
    script.innerHTML = `
      import Chatbot from "https://cdn.n8nchatui.com/v1/embed.js";
      Chatbot.init({
        "n8nChatUrl": "https://n8nautomation.site/webhook/710a142e-8c27-4d6f-b250-e6201dd15be7/chat",
        "metadata": {},
        "theme": {
          "button": {
            "backgroundColor": "#062b89",
            "right": 20,
            "bottom": 20,
            "size": 50,
            "iconColor": "#119cff",
            "customIconSrc": "https://nondzwqwgkqxwnxollfw.supabase.co/storage/v1/object/public/gg/robot%20(1).png",
            "customIconSize": 60,
            "customIconBorderRadius": 15,
            "autoWindowOpen": {
              "autoOpen": false,
              "openDelay": 2
            },
            "borderRadius": "circle"
          },
          "tooltip": {
            "showTooltip": false,
            "tooltipMessage": "Hello 👋 customize & connect me to n8n",
            "tooltipBackgroundColor": "#119cff",
            "tooltipTextColor": "#f9faff",
            "tooltipFontSize": 15
          },
          "chatWindow": {
            "borderRadiusStyle": "rounded",
            "avatarBorderRadius": 20,
            "messageBorderRadius": 6,
            "showTitle": true,
            "title": "SuperBot 🚀",
            "titleAvatarSrc": "https://nondzwqwgkqxwnxollfw.supabase.co/storage/v1/object/public/gg/robot%20(1).png",
            "avatarSize": 32,
            "welcomeMessage": " Hey there! I'm Superbot, your AI assistant by Rajpal Singh.",
            "errorMessage": "Please connect me to n8n first",
            "backgroundColor": "#010c27",
            "height": 600,
            "width": 400,
            "fontSize": 16,
            "starterPrompts": [
              "What are the pending tasks ?"
            ],
            "starterPromptFontSize": 15,
            "renderHTML": false,
            "clearChatOnReload": false,
            "showScrollbar": false,
            "botMessage": {
              "backgroundColor": "#119cff",
              "textColor": "#fafafa",
              "showAvatar": true,
              "avatarSrc": "https://mmadclhbsuvkcbibxcsp.supabase.co/storage/v1/object/public/avatars//357f28f4-9993-4f63-b609-c31f60111133_1752589895884.gif"
            },
            "userMessage": {
              "backgroundColor": "#fff6f3",
              "textColor": "#050505",
              "showAvatar": true,
              "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
            },
            "textInput": {
              "placeholder": "Type your query",
              "backgroundColor": "#119cff",
              "textColor": "#fff6f3",
              "sendButtonColor": "#01061b",
              "maxChars": 50,
              "maxCharsWarningMessage": "You exceeded the characters limit. Please input less than 50 characters.",
              "autoFocus": true,
              "borderRadius": 6,
              "sendButtonBorderRadius": 50
            },
            "uploadsConfig": {
              "enabled": true,
              "acceptFileTypes": [
                "png",
                "jpeg",
                "jpg",
                "pdf",
                "txt"
              ],
              "maxSizeInMB": 5,
              "maxFiles": 1
            },
            "voiceInputConfig": {
              "enabled": true,
              "maxRecordingTime": 15,
              "recordingNotSupportedMessage": "To record audio, use modern browsers like Chrome or Firefox that support audio recording"
            }
          }
        }
      });
    `;
    document.body.appendChild(script);
    scriptRef.current = script;

    // Clean up
    return () => {
      document.body.removeChild(chatElement);
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};
