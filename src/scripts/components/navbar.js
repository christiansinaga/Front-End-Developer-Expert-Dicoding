class Navbar extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
        <!-- Mobile Navbar -->
        <div class="mobile-menu-container">
        <a class="mobile-logo" href="/">CulinaryDelight</a>
            <div class="mobile-menu-icon" id="menu">
                <button class="hamburger-button-style" style="display: inline-block; width: 44px; height: 44px">
                    <span class="hamburger-icon-symbol">&#9776;</span>
                </button>
            </div>
        </div>
        <nav id="drawer" class="mobile-navigation">
            <ul class="mobile-navigation-list">
                <li class="mobile-navigation-item"><a href="/">Home</a></li>
                <li class="mobile-navigation-item"><a href="#/favorite">Favorite</a></li>
                <li class="mobile-navigation-item">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/christiansinaga/">About Us</a>
                </li>
            </ul>
        </nav>
        
        <!-- Desktop Navbar -->
        <nav class="navbar">
            <a class="brand" href="/">CulinaryDelight</a>
            <ul class="navbar-list">
                <li class="navbar-item"><a href="/">Home</a></li>
                <li class="navbar-item"><a href="#/favorite">Favorite</a></li>
                <li class="navbar-item">
                    <a target="_blank" href="https://www.linkedin.com/in/christiansinaga/">About Us</a>
                </li>
            </ul>
        </nav>
      `;
    }
  }

  customElements.define('nav-bar', Navbar);
