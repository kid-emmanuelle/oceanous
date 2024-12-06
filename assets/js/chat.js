class ChatBot {
    constructor() {
        this.messagesContainer = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.typingIndicator = document.getElementById('typing-indicator');

        this.init();
    }

    init() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Désactiver l'entrée pendant le traitement
        this.setInputState(false);

        // Ajouter le message de l'utilisateur au chat
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Afficher l'indicateur de frappe
        this.typingIndicator.classList.add('visible');

        try {
            const response = await this.getGroqResponse(message);
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Erreur:', error);
            this.addMessage('Désolé, j\'ai rencontré une erreur. Veuillez réessayer.', 'bot');
        }

        // Cacher l'indicateur de frappe et réactiver l'entrée
        this.typingIndicator.classList.remove('visible');
        this.setInputState(true);
    }

    async getGroqResponse(message) {
        const GROQ_API_KEY = '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';
        const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama3-groq-70b-8192-tool-use-preview",
                    messages: [
                        {
                            role: "system",
                            content: "Vous êtes un assistant expert pour OceaNous, spécialisé dans le lien entre les océans et la santé humaine. Fournissez des réponses informatives et engageantes sur la biologie marine, la conservation des océans et l'impact des océans sur le bien-être humain. Gardez les réponses concises et amicales. Répondez toujours en français."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                throw new Error('La réponse du réseau n\'était pas correcte');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    setInputState(enabled) {
        this.userInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        if (!enabled) {
            this.sendButton.textContent = 'Envoi...';
        } else {
            this.sendButton.textContent = 'Envoyer';
        }
    }
}

// Initialiser le chatbot quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});