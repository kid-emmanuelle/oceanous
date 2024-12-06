class OceanVisualGenerator {
    constructor() {
        this.GROQ_API_KEY = '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';
        this.promptInput = document.getElementById('prompt-text');
        this.generateBtn = document.getElementById('generate-btn');
        this.visualizationOutput = document.getElementById('visualization-output');
        this.loading = document.getElementById('loading');
        this.gallery = document.getElementById('gallery');

        this.init();
    }

    createSimpleVisualization(description = '') {
        const uniqueId = Date.now();
        return `
            <svg viewBox="0 0 800 400" class="generated-svg" style="width: 100%; height: 400px; background: #1a1a1a;">
                <!-- Background gradient -->
                <defs>
                    <linearGradient id="bgGradient${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#001220;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003;stop-opacity:1" />
                    </linearGradient>
                    
                    <!-- Wave gradients -->
                    <linearGradient id="waveGradient1${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#146185;stop-opacity:0.8">
                            <animate attributeName="stop-color" 
                                values="#146185;#2196f3;#146185" 
                                dur="5s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="100%" style="stop-color:#ff7d16;stop-opacity:0.8">
                            <animate attributeName="stop-color" 
                                values="#ff7d16;#ff9800;#ff7d16" 
                                dur="5s" repeatCount="indefinite"/>
                        </stop>
                    </linearGradient>
                </defs>

                <!-- Background -->
                <rect width="800" height="400" fill="url(#bgGradient${uniqueId})" />

                <!-- Animated waves -->
                ${this.createWaves(uniqueId)}
                
                <!-- Particles -->
                ${this.createParticles()}
                
                <!-- Text overlay -->
                <text x="50%" y="20%" text-anchor="middle" fill="white" font-size="24" opacity="0.8">
                    ${description.split(' ').slice(0, 6).join(' ')}...
                </text>
            </svg>
        `;
    }

    createWaves(uniqueId) {
        const waves = [];
        const numberOfWaves = 3;

        for (let i = 0; i < numberOfWaves; i++) {
            const yOffset = 150 + (i * 50);
            const animationDelay = i * 0.5;
            waves.push(`
                <path d="M0,${yOffset} Q200,${yOffset - 50} 400,${yOffset} T800,${yOffset} V400 H0 Z" 
                      fill="url(#waveGradient1${uniqueId})" 
                      opacity="${0.3 - (i * 0.1)}">
                    <animate 
                        attributeName="d" 
                        dur="${4 + i}s"
                        begin="${animationDelay}s"
                        repeatCount="indefinite"
                        values="
                            M0,${yOffset} Q200,${yOffset - 50} 400,${yOffset} T800,${yOffset} V400 H0 Z;
                            M0,${yOffset} Q200,${yOffset + 50} 400,${yOffset} T800,${yOffset} V400 H0 Z;
                            M0,${yOffset} Q200,${yOffset - 50} 400,${yOffset} T800,${yOffset} V400 H0 Z"
                    />
                </path>
            `);
        }

        return waves.join('');
    }

    createParticles() {
        let particles = '';
        const numberOfParticles = 30;

        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * 800;
            const y = Math.random() * 400;
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            particles += `
                <circle cx="${x}" cy="${y}" r="${size}" fill="white" opacity="0.6">
                    <animate
                        attributeName="cy"
                        values="${y};${y - 50};${y}"
                        dur="${duration}s"
                        begin="${delay}s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.6;0.2;0.6"
                        dur="${duration}s"
                        begin="${delay}s"
                        repeatCount="indefinite"
                    />
                </circle>
            `;
        }

        return particles;
    }

    async getGroqDescription(prompt) {
        try {
            console.log('Sending request to Groq API...');
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "mixtral-8x7b-32768",
                    messages: [
                        {
                            role: "system",
                            content: "Vous êtes un expert en visualisation artistique qui se spécialise dans la création de descriptions d'art abstrait lié à l'océan. Décrivez des visualisations simples en utilisant des formes basiques (cercles, lignes, vagues) et des couleurs. Gardez vos réponses concises, maximum 2 phrases."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 100
                })
            });

            if (!response.ok) {
                throw new Error(`API response not ok: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Erreur de communication avec l\'API');
        }
    }

    async generateVisualization() {
        const prompt = this.promptInput.value.trim();
        if (!prompt) return;

        this.setLoading(true);
        this.visualizationOutput.style.minHeight = '400px';

        try {
            // Get description first
            const description = await this.getGroqDescription(prompt);

            // Create visualization with description
            const visualization = this.createSimpleVisualization(description);

            // Update DOM
            this.visualizationOutput.innerHTML = visualization;

            // Add description below
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'visualization-description';
            descriptionElement.innerHTML = `<p>${description}</p>`;
            this.visualizationOutput.appendChild(descriptionElement);

            // Save to gallery
            this.saveToGallery(visualization + descriptionElement.outerHTML, prompt);
        } catch (error) {
            console.error('Generation error:', error);
            const fallbackViz = this.createSimpleVisualization('Visualisation océanique');
            this.visualizationOutput.innerHTML = fallbackViz;

            const errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.textContent = error.message;
            this.visualizationOutput.appendChild(errorElement);
        }

        this.setLoading(false);
    }

    setLoading(isLoading) {
        this.loading.classList.toggle('active', isLoading);
        this.generateBtn.disabled = isLoading;
        this.generateBtn.textContent = isLoading ? 'Génération...' : 'Générer';
    }

    saveToGallery(visualization, prompt) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = visualization;
        galleryItem.setAttribute('data-prompt', prompt);

        this.gallery.prepend(galleryItem);

        // Keep only the last 6 items
        while (this.gallery.children.length > 6) {
            this.gallery.removeChild(this.gallery.lastChild);
        }
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateVisualization());

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.promptInput.value = btn.dataset.prompt;
            });
        });

        // Add enter key support
        this.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.generateVisualization();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OceanVisualGenerator();
});