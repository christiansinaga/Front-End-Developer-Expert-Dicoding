class CustomFooter extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
      <!-- Footer -->
      <footer tabindex="0">
        <ul>
          <li>Copyright © 2023 - CulinaryDelight</li>
        </ul>
      </footer>
      `;
    }
  }

  customElements.define('custom-footer', CustomFooter);
