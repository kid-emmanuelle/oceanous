// Header component
function loadHeader() {
    const headerHtml = `
        <nav>
            <div class="nav-links">
                <i class="fa fa-bars" onclick="toggleMenu()"></i>
                <a href="../../index.html" class="hero-link">OceaNous</a>
                <div id="nav-links-sub">
                    <ul>
                        <li><a href="#about-us">à propos</a></li>
                        <li><a href="#our-products">podcasts</a></li>
                        <li><a href="#contact">contact</a></li>
                        <li><a href="../../discovery.html">découverte</a></li>
                        <li><a href="../../quizzPage.html">quizz</a></li>
                        <li><a href="../../animation.html">animation</a></li>
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
                    <li><a href="#about-us">à propos</a></li>
                    <li><a href="#our-products">podcast</a></li>
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
                        <li><a href="../../discovery.html">découverte</a></li>
                        <li><a href="#about-us">chatbot</a></li>
                        <li><a href="../../quizzPage.html">quizz</a></li>
                        <li><a href="../../animation.html">animation</a></li>
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