class HeroContent extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
        <div class="culinary-hero" loading="lazy">
            <div class="culinary-hero-inner">
                <h1 class="culinary-hero-title">CulinaryDelight</h1>
                <p class="culinary-hero-subtitle">Our restaurants offer more than just great food</p>
                <div class="search-container">
                    <a href="#/search" class="search-container">
                    <input type="text" id="search-input" placeholder="Find amazing restaurants...">
                    </a>
                    <button id="search-button">Explore</button>
                </div>
            </div>
        </div>
      `;
    }
  }

  customElements.define('hero-content', HeroContent);
