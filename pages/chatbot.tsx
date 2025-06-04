import { useState } from 'react';
import styles from "./chatbot.module.css";

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return; //return if no text input

        const newMessages: Message[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', { //get response from chat
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await res.json();

            if (data.response) { //set chat's response message
                const botMessage: Message = {
                  role: 'assistant',
                  content: data.response.content,
                };
                setMessages([...newMessages, botMessage]);
              } else {
                setMessages([...newMessages, { role: 'assistant', content: 'Error: No response' }]);
              }
        } catch (err) {
            console.error(err);
            setMessages([...newMessages, { role: 'assistant', content: 'Error: Failed to fetch'}]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={styles.bubble}>{msg.content}</span>
                  </div>
                ))}
                {loading && <p>Mandy is thinking...</p>}
            </div>

            <div className={styles.inputArea}>
                <input
                    className={styles.inputBox}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                />
                <button
                    className={styles.sendButton}
                    onClick={sendMessage}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}