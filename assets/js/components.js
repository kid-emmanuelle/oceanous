// Header component
function loadHeader() {
    const headerHtml = `
        <nav>
            <div class="nav-links">
                <i class="fa fa-bars" onclick="toggleMenu()"></i>
                <a href="../../index.html" class="hero-link">OceaNous</a>
                <div id="nav-links-sub">
                    <ul>
                        <li><a href="#about-us">À Propos</a></li>
                        <li><a href="#our-products">Podcasts</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="../../discovery.html">Découverte</a></li>
                        <li><a href="../../quizzPage.html">Quizz</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    const header = document.querySelector('header');
    header.innerHTML = headerHtml;
}

// Footer component
function loadFooter() {
    const footerHtml = `
        <div class="footer-row">
            <p>Copyright &copy; kid-emmanuelle 2024</p>
            <div class="footer-nav-links">
                <ul>
                    <li><a href="#hero-section">OceaNous</a></li>
                    <li><a href="#about-us">about</a></li>
                    <li><a href="#our-products">products</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </div>
        </div>
    `;

    const footer = document.getElementById('footer-section');
    footer.innerHTML = footerHtml;
}

function loadHeaderDiscovery() {
    const headerHtml = `
        <nav>
            <div class="nav-links">
                <i class="fa fa-bars" onclick="toggleMenu()"></i>
                <a href="../../index.html" class="hero-link">OceaNous</a>
                <div id="nav-links-sub">
                    <ul>
                        <li><a href="../../discovery.html">Découverte</a></li>
                        <li><a href="#about-us">Chatbot</a></li>
                        <li><a href="../../quizzPage.html">Quizz</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    const header = document.getElementById('header-section');
    header.innerHTML = headerHtml;
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    loadHeaderDiscovery();
});